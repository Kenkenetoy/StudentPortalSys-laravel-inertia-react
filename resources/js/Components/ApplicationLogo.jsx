export default function ApplicationLogo() {
    const imageName = 'logo.png';

    return (
            <img
                src={`/images/${imageName}`}
                alt="Dynamic Example"
                className="object-contain w-full h-full drop-shadow"
            />
    );
}
