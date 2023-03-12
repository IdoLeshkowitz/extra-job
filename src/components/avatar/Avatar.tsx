import ImageLoader from "@/components/Image/ImageLoader";
import {FC} from "react";

interface AvatarProps {
    avatarUrl: string
    alt: string
    width: number
    height: number
}

const Avatar: FC<AvatarProps> = ({avatarUrl, alt, width, height}) => {
    return (
        <ImageLoader
            src={avatarUrl}
            width={width}
            height={height}
            placeholder={false}
            className='rounded-circle'
            alt={alt}
        />
    )
}

export default Avatar