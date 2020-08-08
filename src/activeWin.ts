import events from 'events'
import { exec } from 'child_process'
import util from 'util'
import { type } from 'os'

const execAsync = util.promisify(exec)
const activeWin = new events.EventEmitter()

type WM_NAME = string
type WM_CLASS = [string, string]
type winName = {
  id: string,
  name: string,
  processname1: string,
  processname2: string
}

async function safeExec (command: string): Promise<string|null> {
  let { stdout, stderr} = await execAsync(command)

  if (stderr) {
    console.error(stderr)
    return null
  }

  return stdout
}

export async function getWindowInfo () : Promise<winName> {
  const windowString = await safeExec('xprop -root _NET_ACTIVE_WINDOW')
  const winId = windowString.trim().split(' ').pop()
  const getName = await safeExec(`xprop -id ${winId} WM_NAME`)
  const getClass = await safeExec(`xprop -id ${winId} WM_CLASS`)

  const windowName = getName.match(/"(.*?)"/).shift() as WM_NAME
  const [processname1, processname2] = getClass.match(/"(.*?)"/) as WM_CLASS

  return {
    id: winId,
    name: windowName.replace(/"/g, ''),
    processname1: processname1.replace(/"/g, ''),
    processname2: processname2.replace(/"/g, ''),
  } 
}


let currentName: winName = {
  id: '',
  name: '',
  processname1: '',
  processname2: ''
}

setInterval(async () => {
  const windowInfo = await getWindowInfo()
  if (currentName.id !== windowInfo.id) {
    currentName = windowInfo
    activeWin.emit('change', currentName)
  }
}, 500)

export default activeWin
