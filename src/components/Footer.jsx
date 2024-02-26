import { Typography } from "@material-tailwind/react";

// Custom Link component for reuse
const FooterLink = ({ children, href }) => (
  <li>
    <Typography
      as="a"
      href={href}
      color="blue-gray"
      className="font-normal transition-colors hover:text-blue-600 focus:text-blue-600"
    >
      {children}
    </Typography>
  </li>
);

const Footer = () => {
  return (
    <footer className="flex w-full fixed bottom-0 bg-amber-500 flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-blue-gray-50 text-center py- md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2024 Emanate
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <FooterLink href="#">About Us</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
        <FooterLink href="#">Contact Us</FooterLink>
      </ul>
    </footer>
  );
};

export default Footer;
