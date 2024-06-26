import { Button } from "../ui/button"

const styles = {
  root: {
    height: 20,
    width: 20,
    cursor: 'pointer',
    border: 0,
    background: 'none'
    // padding: 12
  },
  dot: {
    // backgroundColor: '#e4e6e7',
    height: 20,
    width: 20,
    borderRadius: '50%',
    border: '2px solid #fff'
    // margin: `0px 12px`
  },
  active: {
    backgroundColor: '#fff'
  }
}

export function PaginationDot({
  onClick,
  active,
  index
}: {
  active: boolean
  index: number
  onClick: (i: number) => void
}) {
  const handleClick = () => onClick(index)

  let css
  if (active) {
    css = { ...styles.dot, ...styles.active }
  } else {
    css = styles.dot
  }

  return (
    <Button
    
      onClick={handleClick}
    >
      ...
      {/* <div className={css} /> */}
    </Button>
  )
}
