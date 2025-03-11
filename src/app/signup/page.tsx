
import Image from 'next/image'

export default function page() {
  const fields = [
    { label: 'Name', name: 'name', placeholder: '' },
    { label: 'Email', name: 'email', placeholder: '' },
    { label: 'Username', name: 'username', placeholder: '' },
    { label: 'Password', name: 'password', placeholder: '' },
  ]

  const fieldsList = fields.map(field =>
    <fieldset key={field.label} className="fieldset w-72 my-0 py-0">
      <legend className="fieldset-legend">{field.label}</legend>
      <input type="text" className="input" placeholder="Type here" />
    </fieldset>)

  return (
    <div className="flex-auto box-border grid grid-cols-12">
      <div className="col-span-4 p-12 pt-24 flex flex-col items-center">
        <div>
          <div>
            <p>Sign up section</p>
          </div>
          <div className="flex flex-col gap-1">
            {fieldsList}
            <button className="btn btn-block">Sign up</button>
          </div>
        </div>
      </div>
      <div className="text-center col-span-8">
        <div className="bg-[url(/assets/images/LSF1.png)] min-h-full max-h-full"></div>
      </div>
    </div>
  );
}
