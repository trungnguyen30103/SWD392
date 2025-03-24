import React, { useState, useEffect, useRef } from 'react';
import './ProductDistribution.scss';
import db from '../../../db/db.json';

const ProductDistribution = () => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Process data for chart
    try {
      // Calculate order status distribution
      const statusCounts = db.orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});
      
      // Convert to array format needed for chart
      const data = Object.entries(statusCounts).map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize status
        value: count,
        color: getStatusColor(status)
      }));
      
      setChartData(data);
    } catch (error) {
      console.error("Error preparing chart data:", error);
      // Provide fallback data if there's an error
      setChartData([
        { name: "Delivered", value: 35, color: "#4caf50" },
        { name: "Processing", value: 15, color: "#2196f3" },
        { name: "Pending", value: 8, color: "#ff9800" },
        { name: "Cancelled", value: 3, color: "#f44336" }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#4caf50';
      case 'processing': return '#2196f3';
      case 'pending': return '#ff9800';
      case 'cancelled': return '#f44336';
      default: return '#9e9e9e';
    }
  };
  
  const drawPieChart = (ctx, data) => {
    if (!ctx || data.length === 0) return;
    
    // Clear any previous drawing
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Get accurate dimensions
    const width = ctx.canvas.width / (window.devicePixelRatio || 1);
    const height = ctx.canvas.height / (window.devicePixelRatio || 1);
    
    // Calculate chart dimensions to ensure it's centered
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    const radius = Math.min(width, height) * 0.35;
    
    // Handle empty data case
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
      ctx.font = '14px Arial';
      ctx.fillStyle = '#666';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', centerX, centerY);
      return;
    }
    
    // Draw the donut chart
    let startAngle = -0.5 * Math.PI; // Start at top (12 o'clock)
    
    data.forEach(item => {
      // Calculate slice angle based on value proportion
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      // Draw the slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      
      // Add white border
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fff';
      ctx.stroke();
      
      // Add percentage label if slice is large enough
      if (sliceAngle > 0.2) {
        const labelRadius = radius * 0.7;
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const percent = Math.round((item.value / total) * 100) + '%';
        ctx.fillText(percent, labelX, labelY);
      }
      
      // Move to next slice
      startAngle += sliceAngle;
    });
    
    // Draw donut hole
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    // Add total number in the center
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, centerX, centerY - 10);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Orders', centerX, centerY + 10);
  };
  
  useEffect(() => {
    if (loading || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set the correct dimensions with proper ratio
    const setCanvasDimensions = () => {
      const containerRect = canvas.parentElement.getBoundingClientRect();
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Set canvas size properly
      canvas.width = containerRect.width * devicePixelRatio;
      canvas.height = containerRect.height * devicePixelRatio;
      
      // Set display size
      canvas.style.width = `${containerRect.width}px`;
      canvas.style.height = `${containerRect.height}px`;
      
      // Scale context
      context.scale(devicePixelRatio, devicePixelRatio);
      
      // Draw chart
      drawPieChart(context, chartData);
    };
    
    // Initial setup
    setCanvasDimensions();
    
    // Handle resize
    const handleResize = () => {
      setCanvasDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartData, loading]);
  
  return (
    <div className="product-distribution">
      {loading ? (
        <div className="chart-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="chart-canvas"></canvas>
      )}
    </div>
  );
};

export default ProductDistribution;
