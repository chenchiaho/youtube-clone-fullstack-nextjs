import Image from 'next/image'
import Link from 'next/link'
import { getVideos } from './firebase/functions'
import styles from './page.module.css'

export default async function Home() {
  const videos = await getVideos()
  videos.forEach(video => console.log(video))

  return (
    <div className={styles.main}>
      {videos.map((video) => {
        const fileName = video?.filename?.split('-').slice(2).join('-').split('.')[0];
        return (
          <Link href={`/watch?v=${video.filename}`} key={video.id} className={styles.videoContainer}>
            <Image
              src={'/thumbnail.png'}
              alt='video'
              width={120}
              height={80}
              className={styles.thumbnail}
            />
            {fileName}
          </Link>
        )
      })}
    </div>
  )
}

export const revalidate = 10
