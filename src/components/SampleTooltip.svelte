<script context="module">
  export function tooltip(node, { sample, heading, translateX = '-15px' }) {
    const tooltip = document.createElement('div')
    const filtered = sample.filter((elt) => elt !== '').slice(0, 10)
    if (filtered.length === 0) toHTML(tooltip, ['NO VALUES ...'], heading)
    else toHTML(tooltip, filtered, heading)

    Object.assign(tooltip.style, {
      position: 'absolute',
      boxShadow: '0 2px 7px rgba(0,0,0,0.16)',
      background: '#F6F1E4',
      fontSize: '12px',
      pointerEvents: 'none',
      transform: `translate(${translateX}, -60%)`,
      borderRadius: '2px',
      transition: 'opacity 0.4s',
      textTransform: 'none',
      zIndex: '100',
    })

    function position() {
      const { top, right, bottom } = node.getBoundingClientRect()
      tooltip.style.top = `${(top + bottom) / 2}px`
      tooltip.style.left = `${right}px`
    }

    function append() {
      tooltip.style.transform = `translate(${translateX}, calc(-55% + ${window.scrollY}px))`
      node.parentNode.appendChild(tooltip)
      tooltip.style.opacity = 0
      setTimeout(() => (tooltip.style.opacity = 1))
      position()
    }

    function remove() {
      tooltip.remove()
    }

    node.addEventListener('mouseenter', append)
    node.addEventListener('mouseleave', remove)

    return {
      update() {},
      destroy() {
        tooltip.remove()
        node.removeEventListener('mouseenter', append)
        node.removeEventListener('mouseleave', remove)
      },
    }
  }

  function toHTML(node, sample, heading) {
    const head = document.createElement('h4')
    head.textContent = heading
    Object.assign(head.style, {
      color: 'rgba(0, 0, 0, 0.86)',
      padding: '5px 10px',
      borderBottom: '1px solid rgba(198, 203, 209, 0.3)',
      letterSpacing: '0.01em',
    })
    node.appendChild(head)
    sample.forEach((elt) => {
      const ex = document.createElement('p')
      ex.textContent = elt
      Object.assign(ex.style, {
        letterSpacing: '0.01em',
        padding: '2px 10px 0',
        maxWidth: '420px',
        lineHeight: '1.6',
        color: 'rgba(0, 0, 0, 0.8)',
        fontSize: '12.5px',
        textAlign: 'left',
      })
      node.appendChild(ex)
    })
  }
</script>
