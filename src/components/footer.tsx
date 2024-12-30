const Footer = () => {
    return (  
        <footer className="bg-light-purple py-8">
        <div className="container mx-auto flex justify-between text-gray-600">
          <div>
            <h2 className="font-bold mb-2">Address</h2>
            <p>227 Nguyen Van Cu Street, Ward 4, District 5, HCMC</p>
          </div>
          <div>
            <h2 className="font-bold mb-2">Info</h2>
            <ul>
              <li>Take a Test</li>
              <li>Learn</li>
              <li>Country Setting</li>
              <li>About Us</li>
              <li>Feedback</li>
              <li>Contacts</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-2">Contact us</h2>
            <p>+1 891 989-11-91</p>
            <p>help@odl.com</p>
            <div className="flex space-x-2 mt-2">
              <a href="#" className="text-gray-500 hover:text-purple">Instagram</a>
              <a href="#" className="text-gray-500 hover:text-purple">Facebook</a>
              <a href="#" className="text-gray-500 hover:text-purple">YouTube</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          © 2024 — Copyright
        </div>
      </footer>
    );
}
 
export default Footer;
