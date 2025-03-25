export default function signinPage() {
  const fields = [
    { label: 'Username', name: 'username', placeholder: '' },
    { label: 'Password', name: 'password', placeholder: '' },
  ]
  const backgroundImageCSS = 'bg-[url(/assets/images/LSF2.webp)]'
  const headerLabel = "Sign in"
  const buttonLabel = "Sign in"

  const fieldsList = fields.map(field =>
    <fieldset key={field.label} className="fieldset w-72 my-0 py-0 pb-2">
      <legend className="fieldset-legend py-0 pb-2">{field.label}</legend>
      <input type="text" className="input" placeholder="Type here" />
      {field.label == 'Password' &&
        <div className="flex justify-end"><a href="/forgot-password" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">forgot password?</a></div>
      }
    </fieldset>)

  return (
    <div className="flex h-screen box-border grid grid-cols-12">
      <div className="col-span-4 p-12 pt-24 flex flex-col items-center">
        <div>
          <div>
            <p>{headerLabel}</p>
          </div>
          <div className="flex flex-col pb-4 gap-2">
            {fieldsList}
          </div>
          <button className="btn btn-block">{buttonLabel}</button>
        </div>
      </div>
      <div className="text-center col-span-8">
        <div className={"min-h-full max-h-full " + backgroundImageCSS}></div>
      </div>
    </div>
  )
}