import React from 'react';
import type { CustomerReturn } from '../types';
import { OKA_LOGO_BASE64 } from '../constants';

const Logo = () => (
    <div className="flex items-center gap-3">
        <img src={OKA_LOGO_BASE64} alt="OKA S.C. Logo" className="h-16 w-auto object-contain" />
        <div>
             <h1 className="text-3xl font-bold text-primary">OKA S.C.</h1>
             <p className="text-sm text-gray-600">Hurtownia Budowlana</p>
        </div>
    </div>
);

interface PrintableCustomerReturnProps {
    customerReturn: CustomerReturn;
}

const PrintableCustomerReturn: React.FC<PrintableCustomerReturnProps> = ({ customerReturn }) => {
  return (
    <div className="bg-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-start pb-8 border-b">
        <Logo />
        <div className="text-right">
          <h2 className="text-2xl font-bold">PROTOKÓŁ ZWROTU TOWARU</h2>
          <p className="text-lg font-mono">{customerReturn.docNumber}</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-8 my-8">
        <div>
          <p className="text-sm text-gray-500">Klient:</p>
          <p className="font-bold text-lg">{customerReturn.client}</p>
          {customerReturn.originalWzNumber && (
            <>
              <p className="text-sm text-gray-500 mt-2">Dotyczy dokumentu WZ:</p>
              <p className="font-semibold">{customerReturn.originalWzNumber}</p>
            </>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Data zwrotu:</p>
          <p className="font-bold">{customerReturn.returnDate}</p>
        </div>
      </div>
      
      {/* Items Table */}
      <div className="w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border text-sm font-semibold">Lp.</th>
              <th className="p-3 border text-sm font-semibold">Nazwa towaru</th>
              <th className="p-3 border text-sm font-semibold text-center">Ilość</th>
              <th className="p-3 border text-sm font-semibold text-center">J.m.</th>
              <th className="p-3 border text-sm font-semibold">Powód zwrotu</th>
            </tr>
          </thead>
          <tbody>
            {customerReturn.items.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}.</td>
                <td className="p-3 border font-medium">{item.name}</td>
                <td className="p-3 border text-center">{item.quantity}</td>
                <td className="p-3 border text-center">{item.unit}</td>
                <td className="p-3 border">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-16 mt-24 pt-8">
        <div className="text-center">
          <p className="border-t pt-2 text-sm text-gray-500">Przyjął(a)</p>
          <p className="mt-8 font-medium">{customerReturn.receivedBy}</p>
        </div>
        <div className="text-center">
          <p className="border-t pt-2 text-sm text-gray-500">Zwrócił(a)</p>
        </div>
      </div>
    </div>
  );
};

export default PrintableCustomerReturn;