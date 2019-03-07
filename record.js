(function () {
  var s = document.createElement('script')
  s.src = 'https://cdn.jsdelivr.net/npm/rrweb@latest/dist/record/rrweb-record.min.js'
  s.onload = function () {
    var events = []
    var rrwebRecordStop = rrwebRecord({
      emit(event) {
        events.push(event)
      }
    })
    console.log('start record...')
    var format = function (x, y) {
      var z = {
        Y: x.getFullYear(),
        M: x.getMonth() + 1,
        D: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
      }
      return y.replace(/(Y+|M+|D+|h+|m+|s+)/g, v => ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(-Math.max(v.length, 2)))
    }
    window.stopRecord = function () {
      rrwebRecordStop()
      console.log('stop record...')
      var eleLink = document.createElement('a')
      eleLink.download = 'replay_' + format(new Date(), 'YYYY_MM_DD_hh_mm_ss') + '.html'
      eleLink.style.display = 'none'
      var content = '<!DOCTYPE html>' +
        '<html lang="en">' +
        '  <head>' +
        '    <meta charset="UTF-8" />' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
        '    <meta http-equiv="X-UA-Compatible" content="ie=edge" />' +
        '    <title>Record @' + format(new Date(), 'YYYY_MM_DD_hh_mm_ss') + '</title>' +
        '    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/style.css" />' +
        '  </head >' +
        '  <body>' +
        '    <script src="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/index.js"></script>' +
        '    <script>' +
        '      new rrwebPlayer({' +
        '        target: document.body,' +
        '        data: {' +
        '          events: ' + JSON.stringify(events)
        '        }' +
        '      })' +
        '    </script>' +
        '</body>' +
        '</html >'
      eleLink.href = URL.createObjectURL(new Blob([content]))
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
    }
  }
  document.head.appendChild(s)
})()
