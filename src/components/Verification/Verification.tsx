export function Verification({ setVerifying }) {
    return (
        <div>
            <div>Verification Code</div>
            <div>
                <fieldset className="fieldset mb-4">
                    <legend className="fieldset-legend">Please Enter Verification Code</legend>
                    <input type="text" className="input" placeholder="Type here" />
                    <p className="fieldset-label">Check your email for code</p>
                </fieldset>
                <div className='flex flex-col gap-2'>
                    <button className="btn">Continue</button>
                    <button className="btn" onClick={() => setVerifying(false)}>Go Back</button>
                </div>

            </div>
        </div>
    )
}