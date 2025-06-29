'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { ImagePlaceholder } from './ImagePlaceholder'

interface BaseProductImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
}

export function BaseProductImage({ 
  src, 
  alt, 
  width = 640, 
  height = 640, 
  className = '',
  priority = false,
  sizes,
  quality = 85
}: BaseProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* ローディング状態 */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
          <div className="text-center">
            <Sparkles className="mx-auto mb-2 text-yellow-400 animate-spin" size={32} />
            <span className="text-white text-sm font-medium">Loading...</span>
          </div>
        </div>
      )}

      {/* エラー状態または画像が存在しない場合 */}
      {(hasError || !imgSrc || imgSrc.includes('placeholder')) && (
        <ImagePlaceholder className="absolute inset-0" />
      )}

      {/* 実際の画像（エラー時やplaceholderの場合は表示しない） */}
      {!hasError && imgSrc && !imgSrc.includes('placeholder') && (
        <Image
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      )}
    </div>
  )
}

// BASE専用の画像コンポーネント（プロキシ機能付き）
export function BaseShopImage({ 
  baseImageUrl, 
  alt, 
  ...props 
}: Omit<BaseProductImageProps, 'src'> & { baseImageUrl: string }) {
  // プロキシURLを生成
  const getProxyUrl = (url: string) => {
    if (typeof window === 'undefined') {
      return url // サーバーサイドでは元URL
    }
    return `/api/proxy-image?url=${encodeURIComponent(url)}`
  }

  return (
    <BaseProductImage 
      src={getProxyUrl(baseImageUrl)} 
      alt={alt} 
      {...props} 
    />
  )
}

// 商品カード用の特化したバージョン
export function ProductCardImage({ 
  product, 
  className = '',
  ...props 
}: Omit<BaseProductImageProps, 'src' | 'alt'> & { 
  product: { 
    name: string
    images: string[] 
  }
  className?: string
}) {
  const imageUrl = product.images?.[0] || ''
  
  return (
    <BaseProductImage
      src={imageUrl}
      alt={product.name}
      className={className}
      {...props}
    />
  )
}