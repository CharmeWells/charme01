type FeatureCardProps = {
  index: string
  title: string
  description: string
}

export function FeatureCard({ index, title, description }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <span className="feature-index">{index}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="feature-arrow" aria-hidden="true">↗</span>
    </article>
  )
}
