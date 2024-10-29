const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  )
}
export default Loader;

interface SkeletonLoaderProps {
  width?: string;
  length?: number;
}

export const SkeletonLoader = ({width= "unset", length = 3}: SkeletonLoaderProps) => {

  Array.from({ length }, (_, i) => (
    <div key={i} className="skeleton-loader" style={{width}}></div>
  ))
  return (
    <div className="skeleton-loader" style={{width}}>
      <div className="skeleton-shape"></div>
      <div className="skeleton-shape"></div>
      <div className="skeleton-shape"></div>
      <div className="skeleton-shape"></div>
    </div>
  )
}