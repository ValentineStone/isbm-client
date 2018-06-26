export default function framePriceCalc({
  workWidth,
  workHeight,
  frameWidth,
  framePrice,
  passepartoutWidth,
  passepartoutCount,
  glass,
  embroideryStretching = false,
  cardboardBackpane = false,

  canvasPrinting = false,
  photoPrinting = false,
  portraitInCharacter = false,
  hardboard = false,
  gluing = false,
  mirror = false,

} = {}) {
  workWidth = Number(workWidth)
  workHeight = Number(workHeight)
  frameWidth = Number(frameWidth)
  framePrice = Number(framePrice)
  passepartoutWidth = Number(passepartoutWidth) || 0
  passepartoutCount = Number(passepartoutCount) || 0
  glass = glass || 'regular'

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

  console.log(total)

  return total * 1.1
}