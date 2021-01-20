export default function tooltip(node, text) {
  const tooltip = document.createElement('div')
  tooltip.textContent = text
  Object.assign(tooltip.style, {
    position: 'fixed',
    background: '#444',
    color: '#fff',
    padding: '0.4em 1.2em',
    fontSize: '14px',
    pointerEvents: 'none',
    transform: 'translate(5px, -50%)',
    borderRadius: '2px',
    transition: 'opacity 0.4s',
    boxShadow: ' 0 1px 4px rgba(0, 0, 0, 0.2)',
  })

  function position() {
    const { top, left, bottom, right } = node.getBoundingClientRect()
    const tip = tooltip.getBoundingClientRect()
    tooltip.style.top = `${(top + bottom) / 2}px`
    if (right > (window.innerWidth * 2) / 3) tooltip.style.left = `${left - (tip.right - tip.left) - 10}px`
    else tooltip.style.left = `${right}px`
  }

  function append() {
    document.body.appendChild(tooltip)
    position()
    tooltip.style.opacity = 0
    setTimeout(() => (tooltip.style.opacity = 1))
  }

  function remove() {
    tooltip.remove()
  }

  node.addEventListener('mouseenter', append)
  node.addEventListener('mouseleave', remove)

  return {
    update(text) {
      tooltip.textContent = text
      position()
    },

    destroy() {
      tooltip.remove()
      node.removeEventListener('mouseenter', append)
      node.removeEventListener('mouseleave', remove)
    },
  }
}
