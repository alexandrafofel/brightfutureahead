<input
  id="gdpr"
  type="checkbox"
  {...register("gdprConsent", { required: true })}
  aria-invalid={errors.gdprConsent ? "true" : "false"}
/>

<label htmlFor="gdpr" className="ml-1 select-none">
  I agree with the
</label>{" "}
<Link href={TERMS_URL} className="underline">
  Terms
</Link>{" "}
and{" "}
<Link href={PRIVACY_URL} className="underline">
  Privacy Policy
</Link>
.
