Date.prototype.monthDays= function(){
  var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
  return d.getDate();
}

function getSlab(sDate,eDate) {
var slab = 0;
if(sDate.getMonth() === eDate.getMonth()) {
  slab += (eDate.getDate()+1 - sDate.getDate())/sDate.monthDays();
}
else {
  slab += (sDate.monthDays()+1-sDate.getDate())/sDate.monthDays();
  slab += eDate.getDate()/eDate.monthDays();
 
}
console.log(slab);
return slab;
}

function unitsPrice(units,slab) {
var pay = 0;
if(units < 0) {
  return pay;
}
console.log(units+" "+pay);

if(units === 0) {
  return pay;
}
if(units > 1200) {
  pay += ((units-1200)*slab)*8.75;
  units = 1200;
  return pay+unitsPrice(units,slab);
}
else if(units > 800) {
  pay += ((units - 800)*slab)*8.10;
  units = 800;
  return pay+unitsPrice(units,slab);
}
else if(units > 400) {
  pay += ((units-400)*slab)*7.30;
  units = 400;
  return pay+unitsPrice(units,slab);
}
else if(units > 200) {
  pay += ((units-200)*slab)*5.95;
  units = 200;
  return pay+unitsPrice(units,slab);
}
else {
  pay+= ((units)*slab)*4.00;
  units = 0;
  return pay+unitsPrice(units,slab);
}
}
function calcBill(f) {
var units = parseFloat(f.curr.value) - parseFloat(f.prev.value);
units = parseInt(units);
startDate = new Date(f.startDate.value);
endDate = new Date(f.endDate.value);
console.log(startDate);
console.log(endDate);

var bill = 0;
var slab = getSlab(startDate,endDate)

//FIXED CHARGES with 8% surcharge 
if(f.sancLoad.value === "2 kLpD") {
  bill += 40*slab*1.08;
}
if(f.sancLoad.value === ">2-5 kLpD") {
  bill += 100*slab*1.08;
}

bill += unitsPrice(units,slab);
bill = bill*1.06; //PPAC  charges 6%
bill = bill*1.08; //8% Surcharge 8%

bill = bill*1.05 //Water Tax 5%

bill = (bill).toFixed(2);
if(!units) {
  $("#change").empty().html("Wrong Input");
  return;
}
$("#change").empty().html("&#8377;"+bill+" (incl. taxes)");
var scrollPos =  $("#box").offset().top;
$(window).scrollTop(scrollPos);

}