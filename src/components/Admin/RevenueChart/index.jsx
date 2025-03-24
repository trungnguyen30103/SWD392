import React, { useRef, useEffect } from 'react';
import './RevenueChart.scss';

const RevenueChart = ({ data }) => {
  const canvasRef = useRef(null);
  
  const drawChart = (ctx, data) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;
    
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Calculate max value for scaling
    const maxValue = Math.max(...data.map(item => item.revenue));
    const minValue = Math.min(...data.map(item => item.revenue));
    const valueRange = maxValue - minValue;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#ddd';
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw grid lines
    const gridCount = 5;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#888';
    ctx.font = '12px Arial';
    
    for (let i = 0; i <= gridCount; i++) {
      const y = padding + (chartHeight / gridCount) * i;
      const value = maxValue - (valueRange / gridCount) * i;
      
      ctx.beginPath();
      ctx.strokeStyle = '#f0f0f0';
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      ctx.fillText(`$${value.toFixed(2)}`, padding - 5, y + 4);
    }
    
    // Draw x-axis labels (months)
    ctx.textAlign = 'center';
    const barWidth = chartWidth / data.length;
    
    data.forEach((item, index) => {
      const x = padding + barWidth * index + barWidth / 2;
      ctx.fillText(item.month, x, height - padding + 20);
    });
    
    // Draw the line chart
    ctx.beginPath();
    ctx.strokeStyle = '#2196f3';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    
    data.forEach((item, index) => {
      const x = padding + barWidth * index + barWidth / 2;
      const normalizedValue = (item.revenue - minValue) / valueRange;
      const y = height - padding - normalizedValue * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw data points
    data.forEach((item, index) => {
      const x = padding + barWidth * index + barWidth / 2;
      const normalizedValue = (item.revenue - minValue) / valueRange;
      const y = height - padding - normalizedValue * chartHeight;
      
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 2;
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    
    // Add area under the line
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data.forEach((item, index) => {
      const x = padding + barWidth * index + barWidth / 2;
      const normalizedValue = (item.revenue - minValue) / valueRange;
      const y = height - padding - normalizedValue * chartHeight;
      ctx.lineTo(x, y);
    });
    
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.closePath();
    ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
    ctx.fill();
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Handle high-DPI displays
    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    
    context.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    drawChart(context, data);
    
    // Redraw on window resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      context.scale(devicePixelRatio, devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      drawChart(context, data);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);
  
  return (
    <div className="revenue-chart">
      <canvas ref={canvasRef} className="chart-canvas"></canvas>
    </div>
  );
};

export default RevenueChart;
