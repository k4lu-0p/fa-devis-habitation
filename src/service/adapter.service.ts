import * as moment from 'moment';

interface FormData {
  subscriber: {
    lastname: string,
    firstname: string,
    birthDate: string,
    civility: string,
    job: string,
    familySituation: string,
    address: string,
    additionalAddress: string,
    city: string,
    phone: string,
    email: string,
  },
  property: {
    addressProperty: string,
    additionalPropertyAddress: string,
    cityProperty: string,
    context: string,
    quality: string,
    typeProperty: string,
    floor: string,
    yearBuilding: string,
    destinationProperty: string,
    numberMainRooms: string,
    areaOutbuildings: Number,
    movableCapitalToBeGuaranteed: string,
    objectValuableCapital: string,
  },
  additional: {
    isBuildedWithHeavyMaterials: string,
    isCoveredWithHeavyMaterials: string,
    hasWoodenSkeleton: string,
    isOutbuildingBuildedWithHeavyMaterials: string,
    isOutbuildingCoveredWithHeavyMaterials: string,
    hasOutbuildingWoodenSkeleton: string,
    hasSwimmingPool: string,
    isAbovegroundSwimmingPool: string,
    isCoveredSwimmingPool: string,
    hasVeranda: string,
    verandaSurface: Number,
    hasSolarPannels: string,
    solarPannelsSurface: Number,
    hasClosedFireplace: string,
    hasBillingClosedFireplace: string,
    hasOpenedFireplace: string,
    hasBillingOpenedFireplace: string,
    isOnUnbuildableLand: string,
    isHistoricalMonument: string,
    hasPartiallyProUse: string,
    hasAlreadyTerminatedContract: string,
    hasNoDisaster: string,
    nbDisastersWater: string,
    nbDisastersSteal: string,
    nbDisastersClimatic: string,
    nbDisastersCivil: string,
    nbDisastersOther: string,
  },
  commercialCode: string,
}

function reorganizeFormData(formData: FormData) {

  let cpSubscriber = formData.subscriber.city && formData.subscriber.city.split(' ')[0]
  let citySubscriber = formData.subscriber.city && formData.subscriber.city.split(' ')[1]

  let cpProperty = formData.property.cityProperty.split(' ')[0]
  let cityProperty = formData.property.cityProperty.split(' ')[1]

  // Date de naissance reformater pour l'API SOAP
  let birthDate = moment(formData.subscriber.birthDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
  
  let formDataReorganized = {
    "Document": {
      "DevisHabitation": {
        "Client": {
          "IDFicheClient": null,
          "nom": formData.subscriber.lastname,
          "prenom": formData.subscriber.firstname,
          "dateDeNaissance": birthDate,
          "sexe": formData.subscriber.civility,
          "profession": formData.subscriber.job,
          "situationFamiliale": formData.subscriber.familySituation,
          "AdresseLigne1": formData.subscriber.address,
          "AdresseLigne2": formData.subscriber.additionalAddress,
          "codePostal": cpSubscriber, // slicé
          "ville": citySubscriber, // slicé
          "telephone": formData.subscriber.phone,
          "email": formData.subscriber.email,
        },
        "DescriptionBien1": {
          "AdresseLigne1": formData.property.addressProperty, // dynamique
          "AdresseLigne2": formData.property.additionalPropertyAddress, // dynamique
          "codePostal": cpProperty, // slicé
          "ville": cityProperty, // slicé
          "contexteDemande": formData.property.context,
          "qualiteAssure": formData.property.quality,
          "natureDuBien": formData.property.typeProperty,
          "etageSiAppartement": formData.property.floor,
          "anneeConstruction": formData.property.yearBuilding,
          "destinationBien": formData.property.destinationProperty,
          "nombrePiecePrincipal": formData.property.numberMainRooms,
          "surfaceHabitable": 120, // ?
          "presenceDependance": formData.property.areaOutbuildings > 0 ? 'OUI' : 'NON',
          "surfaceDependances": formData.property.areaOutbuildings,
          "capitalMobilierAGarantir": formData.property.movableCapitalToBeGuaranteed,
          "dontCapitablObjetValeurAGarantir": formData.property.objectValuableCapital,
          "batimentPrincipal": {
            "construitEnMateriauxDurs": formData.additional.isBuildedWithHeavyMaterials,
            "couvertEnMaterieuxDurs": formData.additional.isCoveredWithHeavyMaterials,
            "ossatureBoisOuBardeeBois": formData.additional.hasWoodenSkeleton,
          },
          "dependance": {
            "construitEnMateriauxDurs": formData.additional.isOutbuildingBuildedWithHeavyMaterials,
            "couvertEnMaterieuxDurs": formData.additional.isOutbuildingCoveredWithHeavyMaterials,
            "ossatureBoisOuBardeeBois": formData.additional.hasOutbuildingWoodenSkeleton,
          },
          "presencePiscine": formData.additional.hasSwimmingPool,
          "piscineHorsSol": formData.additional.isAbovegroundSwimmingPool,
          "piscineCouverte": formData.additional.isCoveredSwimmingPool,
          "presenceVeranda": formData.additional.hasVeranda,
          "surfaceVeranda": formData.additional.verandaSurface,
          "presencePanneauxSolairesOuPhotovoltaique": formData.additional.hasSolarPannels,
          "surfaceDesPanneauxSolaires": formData.additional.solarPannelsSurface,
          "presencePoeleABoisOuCheFerme": formData.additional.hasClosedFireplace,
          "intallProFacturePoeleABoisOuCheFerme": formData.additional.hasBillingClosedFireplace,
          "presenceChemineeFoyerOuvert": formData.additional.hasOpenedFireplace,
          "intallProFactureChemineeFoyerOuvert": formData.additional.hasBillingOpenedFireplace,
          "habitationSurTerrainInconstructible": formData.additional.isOnUnbuildableLand,
          "monumentHistorique": formData.additional.isHistoricalMonument,
          "bienUtiliseMemePartiellementPourUsagePRO": formData.additional.hasPartiallyProUse,
          
        },
        "AntecedentsAssurances": {
          "resilieParAutreAssureur60DerniersMois": formData.additional.hasAlreadyTerminatedContract,
          "abscenceTotaleSinistres36DerniersMoisConcernantLeBienAAssurer": formData.additional.hasNoDisaster,
          "nbSinistresDegatDesEaux": formData.additional.nbDisastersWater,
          "nbSinistresVolTentativeVol": formData.additional.nbDisastersSteal,
          "nbSinistresEvenementClimatique": formData.additional.nbDisastersClimatic,
          "nbSinistresResponsabiliteCivil": formData.additional.nbDisastersCivil,
          "nbAutreSinistres": formData.additional.nbDisastersOther,
        },
        "CommissionCourtier": {
          "valeurReglette": 10,
          "fraisDeCourtageAnnuel": 0,
          "valeurRegletteFrais": 0
        },
        "codeCommercial": formData.commercialCode,
      },
    },
  }

  return formDataReorganized;
}

export default {
  reorganizeFormData,
}