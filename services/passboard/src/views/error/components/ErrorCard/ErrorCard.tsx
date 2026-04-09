import { Txt } from '@dnd-lab/desktop'
import Image from 'next/image'

import * as styles from './style.css'
import { vars } from '../../../../styles/theme.css'

type ErrorCardProps = {
  description: string
}

export const ErrorCard = ({ description }: ErrorCardProps) => {
  return (
    <div className={styles.container}>
      <Image
        src='/assets/images/shared/error-card.png'
        alt='error-card'
        width={340}
        height={386}
      />
      <Txt
        as='span'
        typography='body1'
        color={vars.colors.gray800}
        className={styles.text}>
        {description}
      </Txt>
    </div>
  )
}
