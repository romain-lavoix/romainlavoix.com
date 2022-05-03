type Props = {
  title: String
}

const HomeLinkTitle = ({ title }: Props) => {
  return (
    <div className="col-span-12 lg:col-span-1">
      <p className="font-bold sm:text-lg lg:text-base lg:font-normal lg:text-gray-400">
        {title}
      </p>
    </div>
  )
}

export default HomeLinkTitle
