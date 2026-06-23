# Sun Stone Living Spaces Website

Welcome to your new business website! This guide will help you understand how to update and maintain your website.

## 📁 Website Structure

```
sunstone-website/
├── index.html          # Home page
├── services.html       # Services page
├── gallery.html        # Project gallery
├── about.html          # About us page
├── contact.html        # Contact form page
├── css/
│   └── styles.css      # All styling
├── js/
│   └── main.js         # Interactive features
└── images/
    ├── logos/
    │   └── sunstone-logo.svg    # Your business logo
    └── gallery/                  # Project photos go here
```

## 🎨 Brand Colors

Your website uses these professional landscaping colors:
- **Forest Green**: #2E5D34 (Primary - buttons, accents)
- **Charcoal**: #333333 (Secondary - text, headers)
- **White**: #FFFFFF (Backgrounds, contrast)
- **Light Forest Green**: #3A7342 (Accent color)

## 📸 How to Add Photos to Your Gallery

### Step 1: Prepare Your Photos
1. Take high-quality photos of your completed projects
2. Resize images to approximately 1200px wide (for faster loading)
3. Name them descriptively, for example:
   - `lawn-1.jpg`, `lawn-2.jpg` (for lawn projects)
   - `hardscape-1.jpg`, `hardscape-2.jpg` (for flagstone/brick)
   - `bathroom-1.jpg`, `bathroom-2.jpg` (for bathroom remodels)
   - `kitchen-1.jpg`, `kitchen-2.jpg` (for kitchen projects)

### Step 2: Add Photos to the Gallery Folder
1. Copy your photos to the `images/gallery/` folder
2. Make sure the filenames match the pattern above

### Step 3: The Gallery Will Automatically Display Them!
The gallery is already set up with placeholders. Your images will automatically replace the placeholders when you add files with the correct names.

**Current Gallery Structure:**
- **Lawn & Landscaping**: lawn-1.jpg, lawn-2.jpg, lawn-3.jpg
- **Flagstone & Brick**: hardscape-1.jpg, hardscape-2.jpg, hardscape-3.jpg
- **Bathroom Remodels**: bathroom-1.jpg, bathroom-2.jpg, bathroom-3.jpg
- **Kitchen Projects**: kitchen-1.jpg, kitchen-2.jpg, kitchen-3.jpg

### Step 4: Add More Gallery Items (Optional)
To add more photos beyond the initial 12:

1. Open `gallery.html` in a text editor
2. Find the gallery section (around line 60)
3. Copy one of the existing gallery items:

```html
<div class="gallery-item" data-category="lawn">
    <div class="gallery-image">
        <img src="images/gallery/lawn-4.jpg" alt="Lawn and landscaping project">
    </div>
    <div class="gallery-info">
        <h3>Lawn & Landscaping</h3>
        <p>Description of your project</p>
    </div>
</div>
```

4. Change:
   - `data-category`: lawn, hardscape, bathroom, or kitchen
   - `src`: path to your new image
   - `alt`: description for accessibility
   - `<h3>` and `<p>`: title and description

## 📝 How to Update Text Content

### Update Contact Information

**Phone Number:**
1. Open each HTML file (index.html, services.html, etc.)
2. Search for `(512) 555-1234`
3. Replace with your actual phone number
4. Also update `tel:+15125551234` to match (remove spaces/dashes)

**Email Address:**
1. Search for `info@sunstoneliving.com`
2. Replace with your actual email
3. Also update `mailto:info@sunstoneliving.com`

**Service Area:**
1. Search for "Austin, Texas" or "Austin metropolitan area"
2. Update to your actual service area

### Update Services

To modify service descriptions:
1. Open `services.html`
2. Find the service section you want to edit (look for `id="lawn"`, `id="hardscape"`, etc.)
3. Edit the text within the `<p>` and `<li>` tags

### Update About Page

1. Open `about.html`
2. Edit the mission, vision, and values sections
3. Update the "Why Choose Us" reasons as needed

## 🔗 How to Add Social Media Links

Currently, social media links are placeholders (`href="#"`). To activate them:

1. Open each HTML file
2. Find the footer section (near the bottom)
3. Look for these lines:
```html
<a href="#" aria-label="Facebook" class="social-icon">📘</a>
<a href="#" aria-label="Instagram" class="social-icon">📷</a>
<a href="#" aria-label="LinkedIn" class="social-icon">💼</a>
```

4. Replace `#` with your actual social media URLs:
```html
<a href="https://facebook.com/yourpage" aria-label="Facebook" class="social-icon">📘</a>
<a href="https://instagram.com/yourpage" aria-label="Instagram" class="social-icon">📷</a>
<a href="https://linkedin.com/company/yourpage" aria-label="LinkedIn" class="social-icon">💼</a>
```

## 📧 Setting Up the Contact Form

The contact form currently displays a success message but doesn't send emails. To make it functional:

### Option 1: Use a Form Service (Easiest)
1. Sign up for a service like:
   - **Formspree** (https://formspree.io) - Free tier available
   - **Netlify Forms** (if hosting on Netlify)
   - **EmailJS** (https://www.emailjs.com)

2. Follow their instructions to connect your form

### Option 2: Use Your Web Host's Email
Contact your web hosting provider for instructions on setting up form-to-email functionality.

### Option 3: Backend Integration
If you have a developer, they can create a backend script to process form submissions.

## 🌐 How to Publish Your Website

### Option 1: Traditional Web Hosting
1. Purchase hosting from providers like:
   - Bluehost
   - HostGator
   - SiteGround
   - GoDaddy

2. Upload all files using FTP or their file manager
3. Point your domain to the hosting

### Option 2: Free Hosting (Great for Starting)
1. **Netlify** (Recommended):
   - Sign up at netlify.com
   - Drag and drop your `sunstone-website` folder
   - Get a free subdomain or connect your own domain

2. **GitHub Pages**:
   - Create a GitHub account
   - Upload your files to a repository
   - Enable GitHub Pages in settings

3. **Vercel**:
   - Similar to Netlify
   - Sign up and deploy

## 🎯 Quick Customization Checklist

- [ ] Replace phone number: `(512) 555-1234`
- [ ] Replace email: `info@sunstoneliving.com`
- [ ] Update service area if not Austin, TX
- [ ] Add your project photos to `images/gallery/`
- [ ] Add social media links
- [ ] Customize About page content
- [ ] Test contact form
- [ ] Review all service descriptions
- [ ] Add your actual business hours if different

## 🎨 Customizing Colors

To change the website colors:
1. Open `css/styles.css`
2. Find the `:root` section at the top (lines 8-16)
3. Modify the color values:

```css
:root {
    --primary-color: #D4A574;      /* Change this */
    --primary-dark: #8B6F47;       /* And this */
    --secondary-color: #2C5F2D;    /* And this */
    /* etc. */
}
```

## 📱 Mobile Responsive

Your website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Test it by resizing your browser window!

## 🔧 Troubleshooting

**Images not showing?**
- Check that image files are in the correct folder
- Verify filenames match exactly (case-sensitive)
- Make sure images are in JPG, PNG, or WebP format

**Contact form not working?**
- The form needs a backend service (see "Setting Up the Contact Form" above)
- Currently it only shows a success message

**Menu not working on mobile?**
- Make sure `js/main.js` is properly linked
- Check browser console for errors (F12 key)

## 📞 Need Help?

If you need assistance with:
- Adding more complex features
- Integrating with booking systems
- SEO optimization
- Custom modifications

Consider hiring a web developer or reaching out to web development communities.

## 📄 File Editing Tips

**Recommended Text Editors:**
- **VS Code** (Free, highly recommended)
- **Sublime Text**
- **Notepad++** (Windows)
- **TextEdit** (Mac - use plain text mode)

**Don't use:**
- Microsoft Word
- Regular Notepad (can cause encoding issues)

## 🚀 Next Steps

1. **Add Your Content**: Replace placeholder text with your actual business information
2. **Add Photos**: Upload your best project photos
3. **Test Everything**: Click all links, test the contact form, check on mobile
4. **Get Feedback**: Show it to friends/family before publishing
5. **Publish**: Choose a hosting option and go live!
6. **Promote**: Share your new website on social media and business cards

## ✨ Visual Enhancements

Your website includes modern visual effects that enhance user experience:

### Smooth Scroll Animations
- Elements fade in as you scroll down the page
- Gallery items alternate between left and right animations
- Service cards scale in for a dynamic effect
- Staggered timing creates a professional cascade effect

### Image Hover Effects
- Gallery images zoom smoothly on hover (1.15x scale)
- Green gradient overlay appears on hover for visual depth
- Smooth transitions create a polished feel

### Parallax Scrolling
- Hero sections have a parallax effect (background moves slower than content)
- Creates depth and visual interest
- Works on all hero and page header sections

**These effects are automatic and require no configuration!**

## 📊 Future Enhancements

Consider adding:
- Customer testimonials section
- Before/after photo sliders
- Online booking system
- Blog for SEO
- Live chat widget
- Google Maps integration
- Video testimonials

---

**Your website is ready to go! Start by adding your photos and updating the contact information. Good luck with your business! 🌟**