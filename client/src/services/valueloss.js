export const valueLossYear = (car) => {
  console.log(car);
  const valueLossThumbRuleAgeArr = [0,30,35,40,45,50,55,60,65,70,75,80,85,90];
  const heute = new Date().getFullYear();
  const erstzulassung = car.erstzulassung_jahr;
  const kaufdatum = car.kaufdaten.kaufdatum;
  const kaufjahr = parseInt(kaufdatum.substr(kaufdatum.length-4, 4));
  const kaufpreis = car.kaufdaten.kaufpreis;

  //ageFull = car age independent of ownership in years
  //ageOwned = car ownership in years
  //incorrect data (negative values) is reverted to positive values
  let ageFull = Math.abs(heute - erstzulassung)+1; //4
  console.log("ageFullOrg: " + ageFull);
  let ageOwned = Math.abs(heute - kaufjahr)+1;  //2
  console.log("ageOwnedOrg: " + ageOwned);

  //from oldes to newest date
  let determineLossArr = [];
  for (let i=(ageFull); i>(ageFull - ageOwned); i--) {
    let lossBase = ((valueLossThumbRuleAgeArr[i]   === undefined) ? 0 : valueLossThumbRuleAgeArr[i]);
    let lossMod  = ((valueLossThumbRuleAgeArr[i-1] === undefined) ? 0 : valueLossThumbRuleAgeArr[i-1]);
    let loss     = ((lossBase - lossMod) < 0                      ? 0 : (lossBase - lossMod));
    determineLossArr.push(loss);
  }
  //console.log(determineLossArr);

  //assemble books entry object
  let finalValueLossArr = [];
  for (let j=0; j<determineLossArr.length; j++) {
    let entry = { rechnungstyp: 'Wertverlust', _id: `valueloss-${heute-j}`, datum: heute-j, kilometerstand: 0, betrag: Math.round(kaufpreis * (determineLossArr[j]/100)) };
    finalValueLossArr.push(entry);
  }
  console.log(finalValueLossArr);

  return finalValueLossArr;
}
