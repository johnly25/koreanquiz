import { AuthLayout } from "@/components/AuthLayout/AuthLayout";

export default function page() {
  const backgroundImageCSS = 'bg-[url(/assets/images/LSF1.png)]'
  const headerLabel = 'Sign up'
  const buttonLabel = "Sign up"
  const fields = [
    { label: 'Name', name: 'name', placeholder: '' },
    { label: 'Email', name: 'email', placeholder: '' },
    { label: 'Username', name: 'username', placeholder: '' },
    { label: 'Password', name: 'password', placeholder: '' },
  ]

  const fieldsList = fields.map(field =>
    <fieldset key={field.label} className="fieldset w-72 my-0 py-0 pb-2">
      <legend className="fieldset-legend py-0 pb-2">{field.label}</legend>
      <input type="text" className="input" placeholder="Type here" />
    </fieldset>)

  return (
    <AuthLayout buttonLabel={buttonLabel} headerLabel={headerLabel} backgroundImageCSS = {backgroundImageCSS} >
      {fieldsList}
    </AuthLayout>
  );
}
