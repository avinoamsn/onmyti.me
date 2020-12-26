import { useEffect, useState } from 'react'

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/a/21015393/5425359
 */
export const useTextWidth = (text, font) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()

  // re-use canvas object for better performance
  useEffect(() => setCanvas(canvas || document.createElement('canvas')), [
    canvas,
    setCanvas,
  ])

  if (canvas) {
    const context = canvas.getContext('2d')
    context.font = font

    const metrics = context.measureText(text)

    return metrics.width
  }

  return undefined
}

export default useTextWidth
