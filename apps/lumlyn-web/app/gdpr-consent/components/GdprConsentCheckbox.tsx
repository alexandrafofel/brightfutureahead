'use client';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import BackButton from '@/components/BackButton/BackButton';
import {LogoStack} from '@/components/Logo/LogoStack';
import { TERMS_URL, PRIVACY_URL } from '@/lib/policy';


type FormValues = { gdprConsent: boolean };

export default function GdprConsentCheckbox() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormValues>({ defaultValues: { gdprConsent: false } });

  const onSubmit = (data: FormValues) => {
    // TODO: POST /lead
    console.log('GDPR:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-3">
      <LogoStack/>
      <input
        id="gdpr"
        type="checkbox"
        {...register('gdprConsent', { required: 'Please agree before continuing.' })}
        aria-invalid={errors.gdprConsent ? 'true' : 'false'}
        className="mt-1"
      />
      <label htmlFor="gdpr" className="text-sm text-gray-700">
        I agree with the <Link href={TERMS_URL} className="underline">Terms</Link> and{' '}
        <Link href={PRIVACY_URL} className="underline">Privacy Policy</Link>.
      </label>
      <button type="submit" className="rounded-xl px-3 py-2 shadow">Continue</button>
      <BackButton />
    </form>
  );
}
