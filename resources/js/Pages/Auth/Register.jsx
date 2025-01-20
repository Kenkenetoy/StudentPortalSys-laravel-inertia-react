import { Link, useForm } from '@inertiajs/react';

export default function Register() {
    const imageName = 'logo.png';
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        birthday: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative flex justify-center overflow-hidden bg-[url('/images/loginBG.jpg')]">
            <div className="absolute -inset-4 bg-[url('/images/loginBG.jpg')] bg-cover bg-center blur-sm"></div>
            <div className="relative flex bg-base-100 shadow-xl">
                <form className="space-y-4 p-6 py-12" onSubmit={submit}>
                    <div className="hidden flex-col items-center justify-evenly space-y-2 px-12 md:flex">
                        <div className="flex h-32 w-32">
                            <img
                                src={`/images/${imageName}`}
                                alt="Dynamic Example"
                                className="h-full w-full object-contain drop-shadow"
                            />
                        </div>
                        {/* <div className="flex flex-col items-center space-y-1 justify-evenly">
                            <h4 className="text-md text-base-content">
                                Liverpool University
                            </h4>

                            <p className="text-xs leading-relaxed text-base-300">
                                This is a parody project to showcase a school
                                grade system. It is not affiliated with any real
                                school or institution.
                            </p>
                        </div> */}
                    </div>
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold text-base-content">
                            Register
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-base-content">
                            Create an account and explore a world of
                            possibilities. Your journey begins here.
                        </p>
                    </div>

                    {/* Name field */}
                    <label className="input input-primary flex items-center gap-4 p-0 pl-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path
                                fillRule="evenodd"
                                d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Z"
                            />
                        </svg>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="input h-10 grow rounded-none border-none"
                            placeholder="Name"
                            autoFocus={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </label>
                    {errors.name && (
                        <div className="mt-2 text-sm text-red-500">
                            {errors.name}
                        </div>
                    )}

                    {/* Email field */}
                    <label className="input input-primary flex items-center gap-4 p-0 pl-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="input h-10 grow rounded-none border-none"
                            placeholder="Email"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </label>
                    {errors.email && (
                        <div className="mt-2 text-sm text-red-500">
                            {errors.email}
                        </div>
                    )}

                    {/* CALENDAR */}
                    <label className="input input-primary flex items-center gap-4 p-0 pl-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3 3a1 1 0 0 0-1 1v9h12V4a1 1 0 0 0-1-1H3Zm0-1h10a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a2 2 0 0 1 2-2Z" />
                            <path d="M4 8.5a1.5 1.5 0 1 1 3 0v1.8a1.2 1.2 0 1 1-2.4 0V8.5Z" />
                        </svg>
                        <input
                            id="birthday"
                            type="date"
                            name="birthday"
                            value={data.birthday}
                            className="input h-10 grow rounded-none border-none"
                            onChange={(e) =>
                                setData('birthday', e.target.value)
                            }
                        />
                    </label>
                    {errors.birthday && (
                        <div className="mt-2 text-sm text-red-500">
                            {errors.birthday}
                        </div>
                    )}
                    {/* CALENDAR */}

                    {/* Password field */}
                    <label className="input input-primary flex items-center gap-4 p-0 pl-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                            viewBox="0 0 16 16"
                        >
                            <path d="M3 3a1 1 0 0 0-1 1v9h12V4a1 1 0 0 0-1-1H3Zm0-1h10a2 2 0 0 1 2 2v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a2 2 0 0 1 2-2Z" />
                            <path d="M4 8.5a1.5 1.5 0 1 1 3 0v1.8a1.2 1.2 0 1 1-2.4 0V8.5Z" />
                        </svg>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="input h-10 grow rounded-none border-none"
                            placeholder="Password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                    </label>
                    {errors.password && (
                        <div className="mt-2 text-sm text-red-500">
                            {errors.password}
                        </div>
                    )}

                    {/* Confirm Password field */}
                    <label className="input input-primary flex items-center gap-4 p-0 pl-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                            viewBox="0 0 16 16"
                        >
                            <path d="M10 3v9H6V3h4ZM6 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H6Z" />
                        </svg>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="input h-10 grow rounded-none border-none"
                            placeholder="Confirm Password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                        />
                    </label>
                    {errors.password_confirmation && (
                        <div className="mt-2 text-sm text-red-500">
                            {errors.password_confirmation}
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="!mt-8">
                        <button
                            type="submit"
                            className="btn btn-primary w-full text-white"
                            disabled={processing}
                        >
                            Register
                        </button>
                    </div>

                    <p className="!mt-8 text-center text-sm text-base-content">
                        Already have an account?{' '}
                        <Link href={route('login')} className="btn btn-link">
                            Sign in
                        </Link>{' '}
                    </p>
                    <div className="m-auto flex w-3/4 flex-col items-center justify-evenly space-y-1">
                        <h4 className="text-sm text-base-content">
                            Liverpool University
                        </h4>

                        <p className="text-xs leading-relaxed text-base-300">
                            This is a parody project to showcase a school grade
                            system. It is not affiliated with any real school or
                            institution.
                        </p>
                    </div>
                </form>
                {/* side image */}
                <img
                    src="/images/registerimg.jpg"
                    className="h-auto object-cover"
                    alt="Register"
                />
            </div>
        </div>
    );
}
