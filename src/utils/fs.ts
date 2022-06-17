import fs from 'fs/promises'

export const USER_DATA = 'walle.data'
export const USER_SETTINGS = 'walle.settings.json'

export const save = async (data: string, file: string): Promise<void> => {
  // TODO: Add try catch later
  await fs.writeFile(file, data)
}

export const load = async (file: string): Promise<string> => {
  // TODO: Add try catch later
  const data = await fs.readFile(file, 'utf8')
  return data
}

export const isFileExist = async (file: string): Promise<boolean> => {
  try {
    await fs.access(file)
    return true
  } catch (error) {
    return false
  }
}
