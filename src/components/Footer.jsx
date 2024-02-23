import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="flex w-full bg-amber-500 flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-blue-gray-50 py- text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2024 Emanate
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
          >
            About Us
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
          >
            Terms of Service
          </Typography>
        </li>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
          >
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
}

export default Footer