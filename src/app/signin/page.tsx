import { AuthLayout } from "@/components/AuthLayout/AuthLayout";

export default function page() {
  const backgroundImageCSS = 'bg-[url(/assets/images/LSF2.webp)]'
  const headerLabel = "Sign in"
  const buttonLabel = "Sign in"
  
  const fields = [
    { label: 'Username', name: 'username', placeholder: '' },
    { label: 'Password', name: 'password', placeholder: '' },
  ]

  const fieldsList = fields.map(field =>
    <fieldset key={field.label} className="fieldset w-72 my-0 py-0 pb-2">
      <legend className="fieldset-legend py-0 pb-2">{field.label}</legend>
      <input type="text" className="input" placeholder="Type here" />
    </fieldset>)
    
  return (
    <AuthLayout buttonLabel={buttonLabel} headerLabel={headerLabel} backgroundImageCSS={backgroundImageCSS} >
      {fieldsList}
    </AuthLayout>
  );
}
