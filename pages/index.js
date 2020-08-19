import { useState } from 'react'
import axios from 'axios'
import FileSaver from 'file-saver'

export default function Home() {
  const [reviews, setReviews] = useState(null)

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.js`.
    fetch('/reviews')
      .then(res => res.json())
      .then(setReviews)
      .catch(err => console.log(err))
  }

  const handleDownload = async () => {
    let fileName = 'dummy.png'
    const { data } = await axios.get('/api/download', {
      params: {
        url: 'https://dummyimage.com/250x250',
        fileName,
      },
      responseType: 'blob',
    })

    FileSaver.saveAs(data, fileName)
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={handleGetReviews}>Load reviews</button>
        {reviews && (
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <p>{review.text}</p>
                <p>{review.author}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleDownload}>download image</button>
    </div>
  )
}
