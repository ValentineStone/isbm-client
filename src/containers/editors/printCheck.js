import React from 'react'
import { renderToStaticMarkup as renderHtml } from 'react-dom/server'
import checkHeadingPng from '~/assets/check-heading.png'

const onloadAll = (...images) => {
  return Promise.all(images.map(img => 
    new Promise(r =>
      img.addEventListener('load', r)
    )
  ))
}

const printCheck = (order, rootNode) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const checkHeading = new Image()
  const image = new Image()

  const renderedHtml = renderHtml(
    <svg xmlns="http://www.w3.org/2000/svg" width="296" height="420">
      <foreignObject width="100%" height="100%">
        <main xmlns="http://www.w3.org/1999/xhtml" style={{
          height: '98%',
          border: '1px solid black',
          fontFamily: 'Arial, Helvetica, sans-serif',
          padding: '1em',
          paddingTop: 98,
          fontSize: 10.5,
        }}>
          <style>{`
            * { box-sizing: border-box }
            .root { color: #777799 }
            .boolean { color: #569CD6 }
            .string { color: #CE9178 }
            .number { color: #A6CEA8 }
            .undefined { color: #569CD6 }
            .null { color: #569CD6 }
            hr {
              border-width: 0;
              border-top: 1px dashed grey;
            }
            .b { font-weight: bold }
            .details {
              text-align: right;
            }
            .id {
              font-size: .9em;
              margin-bottom: .8em;
            }
          `}</style>
          <div style={{ padding: '0 1em' }}>
            <div className="id">
              <b>Заказ №</b>
              <code style={{float: 'right'}}>{order.indexOfType}</code>
            </div>
            <div className="b">Размер работы</div>
            <div className="details">
              {(order.workWidth * 100).toFixed(0)}
              {' x '}
              {(order.workHeight * 100).toFixed(0)}
              {' см'}
            </div>
            <hr/>
            <div className="b">Рама</div>
            <div className="details">
              {order.frameName}
              {', '}
              {(order.frameWidth * 100)}
              {' см'}
            </div>
            {order.passepartoutWidth &&
              <>
                <hr/>
                <div className="b">Паспарту</div>
                <div  className="details">
                  {(order.passepartoutWidth * 100).toFixed(2)} см
                </div>
              </>
            }
            {order.glass && order.glass !== 'none' &&
              <>
                <hr/>
                <div className="b">Стекло</div>
                <div className="details">
                  {(() => {
                    switch (order.glass) {
                      case 'regular':
                        return 'Художественное стекло'
                      case 'antiReflective':
                        return 'Стекло антиблик'
                      case 'museum':
                        return 'Музейное стекло'
                    }
                  })()}
                </div>
              </>
            }
            {(order.embroideryStretching
              || order.portraitInCharacter
              || order.canvasPrinting
              || order.underframe
              || order.photoPrinting
              || order.photoshopPrice
              || order.mirror
            ) &&
              <>
                <hr/>
                <div className="b">Дополнительно</div>
                <div className="details">
                  {order.embroideryStretching && <div>Натяжка вышивки</div>}
                  {order.portraitInCharacter && <div>Портрет в образе</div>}
                  {order.canvasPrinting && <div>Печать на холсте</div>}
                  {order.underframe && <div>Подрамник</div>}
                  {order.photoPrinting && <div>Фотопечать</div>}
                  {order.photoshopPrice && <div>Фотошоп</div>}
                  {order.mirror && <div>Зеркало</div>}
                </div>
              </>
            }
            
              <hr/>
              <div className="b">Цена</div>
              <div style={{ fontSize: '1.7em' }} className="details">
                {Math.floor(order.price)}
                {' руб'}
              </div>

          </div>
        </main>
      </foreignObject>
    </svg>
  )
  image.src = 'data:image/svg+xml,' + encodeURIComponent(renderedHtml)
  checkHeading.src = checkHeadingPng
  onloadAll(image, checkHeading).then(() => {
    canvas.width = 1480
    canvas.height = 2100

    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    context.drawImage(checkHeading, 0, 0)

    context.font = '39px monospace';
    context.fillText(
      'ИП Романовская Ю.А. ИНН 744406352118 ОГРН 314745619700114',
      120,//365,//600,
      2100,
    );

    canvas.toBlob(blob => {
      window.open('', '_blank').document.write(renderHtml(
        <>
          <title>Печать</title>
          <body style={{ margin: 0 }}>
            <img
              src={URL.createObjectURL(blob)}
              style={{
                //maxWidth: '100%',
                //maxHeight: '100vh',
                width: '422px',
                margin: '0 auto',
                //paddingTop: '5em',
                display: 'block',
              }}
            />
            <script> 
              document.currentScript.previousSibling.onload = {(
                function () {
                  print()
                  close()
                }
              ).toString()}
            </script>
          </body>
        </>
      ))
    })
  })
}

export default printCheck;