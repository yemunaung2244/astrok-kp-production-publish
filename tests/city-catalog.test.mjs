import test from 'node:test';
import assert from 'node:assert/strict';
import { FAVORITE_CITIES, displayCity, searchCities, uniqueCities, offsetForCity } from '../src/city-catalog.js';

const fixture=[...FAVORITE_CITIES,{cityName:'ကန်ကြီးတောင့်မြို့နယ် (Kangyidaunt Township)',country:'Myanmar - Ayeyarwady Region',lat:16.81141,lon:94.87599,tz:6.5},{cityName:'Paris',region:'Île-de-France',country:'France',countryCode:'FR',lat:48.8566,lon:2.3522,tz:1,timeZoneId:'Europe/Paris',searchName:'Pari'}];

test('city search finds Myanmar township, region, country code and normalized aliases',()=>{
  assert.equal(searchCities(fixture,'ကန်ကြီးတောင့်')[0].lat,16.81141);
  assert.equal(searchCities(fixture,'ayeyarwady')[0].lon,94.87599);
  assert.equal(searchCities(fixture,'FR')[0].cityName,'Paris');
  assert.equal(searchCities(fixture,'ile de france')[0].cityName,'Paris');
  assert.equal(displayCity(fixture.at(-1)),'Paris, Île-de-France, France');
});

test('catalog keeps favorites first and removes exact duplicate locations',()=>{
  const all=uniqueCities(FAVORITE_CITIES,[FAVORITE_CITIES[0],fixture.at(-1)]);
  assert.equal(all.length,FAVORITE_CITIES.length+1);
  assert.equal(all[0].cityName,'Yangon');
});

test('city offset uses selected local date including daylight saving time',()=>{
  const paris=fixture.at(-1);
  assert.equal(offsetForCity(paris,{year:2026,month:1,day:15,hour:12,min:0}),1);
  assert.equal(offsetForCity(paris,{year:2026,month:7,day:15,hour:12,min:0}),2);
  assert.equal(offsetForCity(FAVORITE_CITIES[0],{year:2026,month:7,day:15,hour:12,min:0}),6.5);
});
