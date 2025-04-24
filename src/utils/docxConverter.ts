import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, ImageRun } from 'docx';
import { toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';

// Function to parse markdown into structured content
interface ParsedContent {
  type: 'heading' | 'paragraph' | 'list-item' | 'chart-reference';
  text: string;
  level?: number;
}

const parseMarkdown = (markdown: string): ParsedContent[] => {
  // Remove chart code blocks but keep track of their positions and content
  const chartPositions: Array<{offset: number, type: string}> = [];
  let cleanMarkdown = markdown.replace(/```vis-chart[\s\S]*?```/g, (match, offset) => {
    // Try to extract chart type
    let chartType = 'unknown';
    const typeMatch = match.match(/"type"\s*:\s*"(\w+)"/i);
    if (typeMatch && typeMatch[1]) {
      chartType = typeMatch[1].toLowerCase();
    }
    
    chartPositions.push({offset, type: chartType});
    return '{{CHART_REFERENCE}}';
  });
  
  // Remove other code blocks
  cleanMarkdown = cleanMarkdown.replace(/```[\s\S]*?```/g, '');
  
  // Split into lines and process each line
  const lines = cleanMarkdown.split('\n');
  const parsedContent: ParsedContent[] = [];
  
  lines.forEach(line => {
    line = line.trim();
    if (!line) return;
    
    // Check for chart reference
    if (line === '{{CHART_REFERENCE}}') {
      // Get chart type from the positions array
      let chartDescription = '数据图表';
      
      // Get the chart type from the saved positions
      const chartInfo = chartPositions.shift();
      if (chartInfo && chartInfo.type) {
        const chartType = chartInfo.type;
        switch (chartType) {
          case 'line':
            chartDescription = '折线图';
            break;
          case 'bar':
            chartDescription = '柱状图';
            break;
          case 'pie':
            chartDescription = '饼图';
            break;
          case 'column':
            chartDescription = '柱状图';
            break;
          default:
            chartDescription = `${chartType}图表`;
        }
      }
      
      parsedContent.push({
        type: 'chart-reference',
        text: chartDescription
      });
      return;
    }
    
    // Check for headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      parsedContent.push({
        type: 'heading',
        text: headingMatch[2],
        level: headingMatch[1].length
      });
      return;
    }
    
    // Check for list items
    const listMatch = line.match(/^[\*\-\+]\s+(.+)$/);
    if (listMatch) {
      parsedContent.push({
        type: 'list-item',
        text: listMatch[1]
      });
      return;
    }
    
    // Regular paragraph
    parsedContent.push({
      type: 'paragraph',
      text: line
    });
  });
  
  return parsedContent;
};

// Function to extract chart data from markdown
const extractChartData = (markdown: string): { type: string; data: any }[] => {
  const charts: { type: string; data: any }[] = [];
  const chartRegex = /```vis-chart\s*([\s\S]*?)```/g;
  
  let match;
  while ((match = chartRegex.exec(markdown)) !== null) {
    try {
      const chartJson = match[1].trim();
      const chartData = JSON.parse(chartJson);
      charts.push(chartData);
    } catch (error) {
      console.error('Error parsing chart data:', error);
    }
  }
  
  return charts;
};

// Function to capture chart images from DOM elements
export const captureChartImages = async (chartElements: HTMLElement[]): Promise<string[]> => {
  const imageDataUrls: string[] = [];
  
  console.log(`Attempting to capture ${chartElements.length} chart images`);
  
  for (let i = 0; i < chartElements.length; i++) {
    const element = chartElements[i];
    try {
      console.log(`Processing chart ${i+1}/${chartElements.length}`);
      
      // Make sure the element is visible and has dimensions
      if (element.offsetWidth === 0 || element.offsetHeight === 0) {
        console.warn(`Chart element ${i+1} has zero dimensions, skipping`);
        imageDataUrls.push('');
        continue;
      }
      
      // Add a longer delay to ensure chart is fully rendered
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the actual chart canvas/svg within the container
      const chartContent = element.querySelector('canvas, svg');
      const targetElement = chartContent as HTMLElement || element;
      
      console.log(`Capturing image for chart ${i+1}`);
      const dataUrl = await toJpeg(targetElement, { 
        quality: 0.95,
        backgroundColor: '#ffffff',
        canvasWidth: 800,
        canvasHeight: 500,
        skipAutoScale: true,
        pixelRatio: 2 // Higher resolution
      });
      
      console.log(`Successfully captured chart ${i+1}, data URL length: ${dataUrl.length}`);
      imageDataUrls.push(dataUrl);
    } catch (error) {
      console.error(`Error capturing chart ${i+1} image:`, error);
      imageDataUrls.push(''); // Push empty string for failed captures
    }
  }
  
  return imageDataUrls;
};

// Function to convert data URL to array buffer for docx
const dataUrlToArrayBuffer = (dataUrl: string): ArrayBuffer | null => {
  try {
    if (!dataUrl || dataUrl.length < 100) {
      console.warn('Invalid or empty data URL');
      return null;
    }
    
    // Ensure we have a proper data URL format
    if (!dataUrl.startsWith('data:image')) {
      console.warn('Data URL does not start with data:image');
      return null;
    }
    
    const base64 = dataUrl.split(',')[1];
    if (!base64) {
      console.warn('No base64 data found in data URL');
      return null;
    }
    
    console.log(`Converting data URL to array buffer, base64 length: ${base64.length}`);
    
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    console.log(`Successfully converted to array buffer of size: ${bytes.buffer.byteLength}`);
    return bytes.buffer;
  } catch (error) {
    console.error('Error converting data URL to array buffer:', error);
    return null;
  }
};

// Main function to convert markdown to docx and download
export const convertToDocxAndDownload = async (
  content: string,
  filename: string = 'document.docx',
  chartImages: string[] = []
): Promise<void> => {
  // Parse markdown content
  const parsedContent = parseMarkdown(content);
  const charts = extractChartData(content);
  
  // Create paragraphs for the document
  const docElements: Paragraph[] = [];
  
  // Track chart image index
  let chartImageIndex = 0;
  
  // Process each content item
  for (const item of parsedContent) {
    switch (item.type) {
      case 'heading':
        // Map numeric level to heading string
        const headingLevel = item.level ? `Heading${item.level}` : undefined;
        
        docElements.push(new Paragraph({
          text: item.text,
          heading: headingLevel as any, // Using any to bypass type checking
          thematicBreak: item.level === 1, // Add line under level 1 headings
          spacing: { before: 240, after: 120 } // Add spacing around headings
        }));
        break;
      
      case 'list-item':
        docElements.push(new Paragraph({
          text: `• ${item.text}`,
          indent: { left: 720 }, // Indent list items
          spacing: { before: 80, after: 80 }
        }));
        break;
      
      case 'chart-reference':
        // Add chart image if available
        if (chartImages[chartImageIndex] && chartImages[chartImageIndex].length > 0) {
          try {
            const imageBuffer = dataUrlToArrayBuffer(chartImages[chartImageIndex]);
            
            if (imageBuffer) {
              // Add chart title
              docElements.push(new Paragraph({
                children: [
                  new TextRun({
                    text: `📊 ${item.text}`,
                    bold: true,
                    size: 24
                  })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 120 }
              }));
              
              // Add chart image
              try {
                docElements.push(new Paragraph({
                  children: [
                    new ImageRun({
                      data: imageBuffer,
                      transformation: {
                        width: 500,
                        height: 300
                      },
                      altText: {
                        title: "Chart Image",
                        description: "Generated chart from analysis",
                      }
                    } as any) // Using any to bypass type checking for now
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 120 }
                }));
                console.log('Successfully added chart image to document');
              } catch (imgError) {
                console.error('Error adding image to document:', imgError);
                // Fallback text
                docElements.push(new Paragraph({
                  children: [
                    new TextRun({
                      text: `📊 ${item.text} (图片处理失败)`,
                      italics: true,
                      color: "#666666"
                    })
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { after: 120 }
                }));
              }
            } else {
              // Fallback if image conversion failed
              docElements.push(new Paragraph({
                children: [
                  new TextRun({
                    text: "📊 " + item.text,
                    italics: true,
                    color: "#666666"
                  })
                ],
                alignment: AlignmentType.CENTER,
                border: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: "#EEEEEE" },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: "#EEEEEE" }
                },
                spacing: { before: 200, after: 200 }
              }));
            }
          } catch (error) {
            console.error('Error adding chart image to document:', error);
            // Fallback text
            docElements.push(new Paragraph({
              children: [
                new TextRun({
                  text: "📊 " + item.text,
                  italics: true,
                  color: "#666666"
                })
              ],
              alignment: AlignmentType.CENTER,
              border: {
                top: { style: BorderStyle.SINGLE, size: 1, color: "#EEEEEE" },
                bottom: { style: BorderStyle.SINGLE, size: 1, color: "#EEEEEE" }
              },
              spacing: { before: 200, after: 200 }
            }));
          }
          
          chartImageIndex++;
        } else {
          // No image available, use text placeholder
          docElements.push(new Paragraph({
            children: [
              new TextRun({
                text: "📊 " + item.text,
                italics: true,
                color: "#666666"
              })
            ],
            alignment: AlignmentType.CENTER,
            border: {
              top: { style: BorderStyle.SINGLE, size: 1, color: "#EEEEEE" },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: "#EEEEEE" }
            },
            spacing: { before: 200, after: 200 }
          }));
          
          chartImageIndex++;
        }
        break;
      
      default: // paragraph
        docElements.push(new Paragraph({
          text: item.text,
          spacing: { before: 80, after: 80 }
        }));
        break;
    }
  }
  
  // Add summary of charts at the end if there are charts
  if (charts.length > 0) {
    docElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `本文档包含 ${charts.length} 个数据图表，完整图表请在原始界面查看。`,
            size: 24,
            italics: true,
            color: "#666666"
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 240 }
      })
    );
  }
  
  // Create the document
  const doc = new Document({
    title: filename.replace('.docx', ''),
    description: '由AI助手生成的企业分析报告',
    styles: {
      paragraphStyles: [
        {
          id: 'Normal',
          name: 'Normal',
          run: {
            size: 24, // 12pt
            font: 'Microsoft YaHei'
          },
          paragraph: {
            spacing: { line: 360 } // 1.5 line spacing
          }
        }
      ]
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440
            }
          }
        },
        children: docElements
      },
    ],
  });

  // Generate and download the docx file
  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  saveAs(blob, filename);
};
