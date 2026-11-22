import { useState } from 'react';
import { Download, Mail } from 'lucide-react';
import type { Order } from '../../data/orders';
import { formatPrice } from '../../lib/utils';

export function InvoiceButton({ order }: { order: Order }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;

      // Header
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(46, 94, 30); // safari green
      doc.text('E-SHOP', margin, margin);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(114, 121, 108);
      doc.text('Nairobi, Kenya · M-Pesa Express Verified', margin, margin + 8);
      doc.text('Tax Invoice / Receipt', margin, margin + 16);

      // Invoice title
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(27, 28, 28);
      doc.text(`INVOICE ${order.orderNumber}`, pageWidth - margin - 60, margin, { align: 'right' });

      // Divider
      doc.setDrawColor(194, 201, 185);
      doc.setLineWidth(0.5);
      doc.line(margin, margin + 28, pageWidth - margin, margin + 28);

      let y = margin + 40;

      // Customer info block
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(27, 28, 28);
      doc.text('Bill To', margin, y);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(114, 121, 108);
      doc.text(order.customer.name, margin, y + 7);
      doc.text(order.customer.email, margin, y + 14);
      doc.text(order.customer.phone, margin, y + 21);
      doc.text(`${order.customer.address}, ${order.customer.city}`, margin, y + 28);

      // Order info block (right side)
      const infoX = pageWidth - margin - 80;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(114, 121, 108);
      doc.text('Order Date', infoX, y);
      doc.text('Order Number', infoX, y + 7);
      doc.text('Payment Method', infoX, y + 14);
      doc.text('Status', infoX, y + 21);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(27, 28, 28);
      doc.text(new Date(order.createdAt).toLocaleDateString(), infoX + 45, y);
      doc.text(order.orderNumber, infoX + 45, y + 7);
      doc.text(order.paymentMethod === 'mpesa' ? 'M-Pesa Express' : 'Card', infoX + 45, y + 14);
      doc.text(order.status.charAt(0).toUpperCase() + order.status.slice(1), infoX + 45, y + 21);

      y += 45;

      // Items table header
      doc.setFillColor(46, 94, 30);
      doc.rect(margin, y, pageWidth - 2 * margin, 10, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('Item', margin + 5, y + 7);
      doc.text('Qty', pageWidth - margin - 110, y + 7);
      doc.text('Unit Price', pageWidth - margin - 70, y + 7);
      doc.text('Total', pageWidth - margin - 30, y + 7);
      y += 12;

      // Items
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(66, 73, 61);
      for (const item of order.items) {
        doc.text(item.name, margin + 5, y);
        doc.text(item.quantity.toString(), pageWidth - margin - 110, y);
        doc.text(formatPrice(item.price), pageWidth - margin - 70, y);
        doc.text(formatPrice(item.total), pageWidth - margin - 30, y);
        y += 10;
        // Divider line between items
        doc.setDrawColor(232, 227, 221);
        doc.setLineWidth(0.25);
        doc.line(margin, y - 3, pageWidth - margin, y - 3);
      }

      y += 5;

      // Totals
      const totalsX = pageWidth - margin - 80;
      const totals = [
        { label: 'Subtotal', value: formatPrice(order.subtotal), color: 'normal' },
        { label: 'Discount', value: order.discount > 0 ? `- ${formatPrice(order.discount)}` : '-', color: order.discount > 0 ? 'safari' : 'normal' },
        { label: 'Total', value: formatPrice(order.total), color: 'bold' },
      ];

      for (const t of totals) {
        doc.setFontSize(10);
        doc.setFont(t.color === 'bold' ? 'helvetica' : 'helvetica', t.color === 'bold' ? 'bold' : 'normal');
        doc.setTextColor(t.color === 'safari' ? [46, 94, 30] : [27, 28, 28]);
        doc.text(t.label, totalsX, y);
        doc.text(t.value, totalsX + 60, y);
        y += 10;
      }

      // Payment info
      y += 10;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(27, 28, 28);
      doc.text('Payment Details', margin, y);
      y += 7;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(114, 121, 108);
      doc.text(`Method: ${order.paymentMethod === 'mpesa' ? 'Lipa na M-Pesa (STK Push)' : 'Card'}`, margin, y);
      y += 6;
      if (order.paymentReference) {
        doc.text(`M-Pesa Reference: ${order.paymentReference}`, margin, y);
        y += 6;
      }
      doc.text('Thank you for shopping with E-shop!', margin, y);
      y += 10;
      doc.setFontSize(8);
      doc.setTextColor(114, 121, 108);
      doc.text('This is a computer-generated invoice. No signature required.', margin, y);

      // Save PDF
      const fileName = `E-shop-Invoice-${order.orderNumber}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('Failed to generate invoice:', err);
      alert('Failed to generate invoice. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2 px-4 py-2.5 rounded-md bg-safari text-white text-sm font-medium transition-colors hover:bg-[#214315] disabled:opacity-60"
      >
        {downloading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <Download size={16} strokeWidth={2} />
        )}
        {downloading ? 'Generating...' : 'Download PDF Invoice'}
      </button>
    </div>
  );
}
