import React from 'react';
import { MapPin } from 'lucide-react';

const Map = () => (
  <div className="bg-slate-200 w-full h-80 rounded-2xl flex flex-col items-center justify-center text-slate-500">
    <MapPin size={48} className="mb-2 text-blue-600" />
    <p className="font-medium">г. Актау, 14 мкр, БЦ "Звезда"</p>
    <p className="text-sm">(Карта загрузится при наличии API-ключа)</p>
  </div>
);
export default Map;