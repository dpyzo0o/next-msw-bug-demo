import axios from 'axios'

export default async (req, res) => {
  const { url, fileName } = req.query

  try {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' })
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(fileName)}`
    )
    res.setHeader('Content-Length', data.byteLength)
    res.status(200).end(data)
  } catch (error) {
    res.status(500).end('download fail')
  }
}
