

export default function TierBadge({ tier, className = '' }) {
  const getTierClasses = (tier) => {
    switch (tier) {
      case 'free':
        return 'tier-free'
      case 'silver':
        return 'tier-silver'
      case 'gold':
        return 'tier-gold'
      case 'platinum':
        return 'tier-platinum'
      default:
        return 'tier-free'
    }
  }

  return (
    <span className={`tier-badge ${getTierClasses(tier)} ${className}`}>
      {tier}
    </span>
  )
}