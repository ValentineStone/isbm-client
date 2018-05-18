/*
const knownFrames = [
  { artNo: 1, name: 'Pinkie Pie', width: .056, price: 565 },
  { artNo: 2, name: 'Twilight sparkle', width: .06, price: 298 },
  { artNo: 3, name: 'Rainbow Dash', width: .04, price: 228 },
  { artNo: 4, name: 'Rarity', width: .11, price: 728 },
  { artNo: 5, name: 'Fluttershy', width: .03, price: 201 },
  { artNo: 6, name: 'Applejack', width: .07, price: 412 }
]
*/

import knownFrames from './knownFrames.csv'
// Багет,Артикул,"Ширина, мм","Цена, руб"
knownFrames.forEach(r => r[2] /= 1000)
knownFrames.shift()

const dummyObject = Object.freeze({})
let cacheKey
let cacheValue
function getFrameProps(artNo) {
  if (!artNo && typeof artNo !== 'number') return dummyObject
  if (artNo === cacheKey)
    return cacheValue
  else {
    cacheKey = artNo
    cacheValue = knownFrames.find(frame => frame[1] == artNo) || dummyObject
    return cacheValue
  }
}

const getFrameWidth = ({ articleNumber }) => getFrameProps(articleNumber)[2]
const getFramePrice = ({ articleNumber }) => getFrameProps(articleNumber)[3]
const getFrameName = ({ articleNumber }) => getFrameProps(articleNumber)[0]

export const glassTypes = {
  regular: 'Regular glass',
  antiReflective: 'Anti-reflective glass',
  museum: 'Museum glass',
  none: 'No glass'
}

export default [{
  workWidth: {
    element: 'number',
    props: {
      label: 'Work width',
      units: 'cm',
      scale: 1 / 100
    }
  },
  workHeight: {
    element: 'number',
    props: {
      label: 'Work height',
      units: 'cm',
      scale: 1 / 100
    }
  },
  frameName: {
    element: 'text',
    props: {
      label: 'Frame name',
      equals: getFrameName
    }
  },
  frameWidth: {
    element: 'number',
    props: {
      label: 'Frame width',
      units: 'mm',
      scale: 1 / 1000,
      equals: getFrameWidth
    }
  },
  framePrice: {
    element: 'number',
    props: {
      label: 'Frame price',
      units: { withRegex: '{rub}/{m}' },
      equals: getFramePrice
    }
  },
  passepartoutWidth: {
    element: 'number',
    props: {
      label: 'Passepartout width',
      units: 'cm',
      scale: 1 / 100
    }
  },
  passepartoutCount: {
    element: 'number',
    props: {
      label: 'Passepartout count',
      inputType: 'number',
      default: 0
    }
  },
  glass: {
    element: 'select',
    props: {
      single: true,
      label: 'Glass',
      default: 'regular',
      options: glassTypes
    }
  },/*
  price: {
    element: 'number',
    props: {
      label: 'Price',
      units: 'rub',
      equals: calc
    }
  }*/
}, {
  articleNumber: {
    element: 'text',
    props: {
      label: 'Farme article number'
    }
  },
  embroideryStretching: {
    element: 'boolean',
    props: {
      label: 'Embroidery stretching',
      default: false
    }
  },
  canvasPrinting: {
    element: 'boolean',
    props: {
      label: 'Canvas printing',
      default: false
    }
  },
  photoPrinting: {
    element: 'boolean',
    props: {
      label: 'Photo printing',
      default: false
    }
  },
  portraitInCharacter: {
    element: 'boolean',
    props: {
      label: 'Portrait in character',
      default: false
    }
  },
  hardboard: {
    element: 'boolean',
    props: {
      label: 'Hardboard',
      default: false
    }
  },
  cardboardBackpane: {
    element: 'boolean',
    props: {
      label: 'Сardboard backpane',
      default: false
    }
  },
  gluing: {
    element: 'boolean',
    props: {
      label: 'Gluing',
      default: false
    }
  },
  mirror: {
    element: 'boolean',
    props: {
      label: 'Mirror',
      default: false
    }
  }
}]


export function calc({
  workWidth,
  workHeight,
  frameWidth,
  framePrice,
  passepartoutWidth = 0,
  passepartoutCount = 0,
  glass = 'regular',
  embroideryStretching = false,
  cardboardBackpane = false,

  canvasPrinting = false,
  photoPrinting = false,
  portraitInCharacter = false,
  hardboard = false,
  gluing = false,
  mirror = false,

} = {}) {
  workWidth += 2 * passepartoutWidth
  workHeight += 2 * passepartoutWidth

  let workPerimeter = 2 * (workWidth + workHeight)
  let workArea = workWidth * workHeight

  let montageTotal = 800
    * (workWidth + 2 * frameWidth)
    * (workHeight + 2 * frameWidth)
  montageTotal = montageTotal < 200 ? 200 : montageTotal

  let frameUsageTotal = workPerimeter + frameWidth * 8 + .1
  if (frameWidth > 0.07)
    frameUsageTotal = Math.ceil(frameUsageTotal / 2.9) * 2.9
  let frameTotal = frameUsageTotal * framePrice

  let embroideryStretchingTotal = (embroideryStretching ? 1 : 0) * workArea * 1200
  let cardboardCount = (embroideryStretching ? 1 : 0) + (cardboardBackpane ? 1 : 0)
  let cardboardTotal = workArea * 1000 * cardboardCount
  let passepartoutTotal = passepartoutCount * workArea * 1200
  let regularGlassTotal = (glass === 'regular' ? 1 : 0) * workArea * 1300
  let antiReflectiveGlassTotal = (glass === 'antiReflective' ? 1 : 0) * workArea * 3300
  let museumGlassTotal = (glass === 'museum' ? 1 : 0) * workArea * 15000

  let canvasUsageTotal = (workWidth + 0.1) * (workHeight + 0.1)
  let canvasPrintingTotal = canvasPrinting ? workArea * 3900 : 0
  let photoPrintingTotal = photoPrinting ? workArea * 2800 : 0
  let portraitInCharacterTotal = portraitInCharacter ? 1900 : 0
  let hardboardTotal = hardboard ? workArea * 500 : 0
  let gluingTotal = gluing ? workArea * 900 : 0
  let mirrorTotal = mirror ? workArea * 2500 : 0

  let extrasTotal =
    embroideryStretchingTotal
    + cardboardTotal
    + passepartoutTotal
    + regularGlassTotal
    + antiReflectiveGlassTotal
    + museumGlassTotal

    + canvasPrintingTotal
    + photoPrintingTotal
    + portraitInCharacterTotal
    + hardboardTotal
    + gluingTotal
    + mirrorTotal

  let total = montageTotal + frameTotal + extrasTotal

  return total * 1.1
}