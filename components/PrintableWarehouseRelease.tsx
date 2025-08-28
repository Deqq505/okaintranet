import React from 'react';
import type { WarehouseRelease } from '../types';
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

interface PrintableWarehouseReleaseProps {
    release: WarehouseRelease;
}

const PrintableWarehouseRelease: React.FC<PrintableWarehouseReleaseProps> = ({ release }) => {
  return (
    <div className="bg-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-start pb-8 border-b">
        <Logo />
        <div className="text-right">
          <h2 className="text-2xl font-bold">WYDANIE MAGAZYNOWE</h2>
          <p className="text-lg font-mono">{release.docNumber}</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-8 my-8">
        <div>
          <p className="text-sm text-gray-500">Klient:</p>
          <p className="font-bold text-lg">{release.client}</p>
          {release.constructionSite && (
            <>
              <p className="text-sm text-gray-500 mt-2">Budowa:</p>
              <p className="font-semibold">{release.constructionSite}</p>
            </>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Data wystawienia:</p>
          <p className="font-bold">{release.issueDate}</p>
        </div>
      </div>
      
      {/* Items Table */}
      <div className="w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border text-sm font-semibold">Lp.</th>
              <th className="p-3 border text-sm font-semibold">Nazwa towaru / usługi</th>
              <th className="p-3 border text-sm font-semibold text-center">Ilość</th>
              <th className="p-3 border text-sm font-semibold text-center">J.m.</th>
            </tr>
          </thead>
          <tbody>
            {release.items.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}.</td>
                <td className="p-3 border font-medium">{item.name}</td>
                <td className="p-3 border text-center">{item.quantity}</td>
                <td className="p-3 border text-center">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      {release.notes && (
          <div className="mt-8">
              <p className="text-sm text-gray-500">Uwagi:</p>
              <p className="p-3 border bg-gray-50 rounded-md mt-1">{release.notes}</p>
          </div>
      )}

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-16 mt-24 pt-8">
        <div className="text-center">
          <p className="border-t pt-2 text-sm text-gray-500">Wystawił(a)</p>
          <p className="mt-8 font-medium">{release.issuedBy}</p>
        </div>
        <div className="text-center">
          <p className="border-t pt-2 text-sm text-gray-500">Odebrał(a)</p>
        </div>
      </div>
    </div>
  );
};

export default PrintableWarehouseRelease;