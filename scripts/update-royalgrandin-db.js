const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const path = require('path');
const mongoose = require(path.join(process.cwd(), 'backend/node_modules/mongoose'));
const URI = 'mongodb+srv://saidineshgoexperts_db_user:OInrgEWHipIlJhuy@goexperts.ihc4tu2.mongodb.net/resort_booking';

async function updateDb() {
  await mongoose.connect(URI);
  console.log('Connected to DB');

  // 1. Update site_config
  const siteConfigRes = await mongoose.connection.db.collection('settings').updateOne(
    { key: 'site_config' },
    {
      $set: {
        'value.siteName': 'Royalgrandin Resort',
        'value.smtpSender': 'Royalgrandin Resort Reservations',
        'value.copyrightText': '© {year} Royalgrandin Resort. All rights reserved.',
        'value.description': 'Nestled amidst the lush forests and serene landscapes of Maredumilli, Royalgrandin Resort offers an unparalleled luxury escape where royalty meets the wild.',
        'value.footerDescription': 'Nestled amidst the lush forests and tranquil canopy of Maredumilli, Royalgrandin Resort offers a refined sanctuary where luxury harmonizes with pristine nature.'
      }
    }
  );
  console.log('site_config updated:', siteConfigRes.modifiedCount);

  // 2. Update seo_config
  const seoDoc = await mongoose.connection.db.collection('settings').findOne({ key: 'seo_config' });
  if (seoDoc && Array.isArray(seoDoc.value)) {
    const updatedSeo = seoDoc.value.map(item => {
      let title = item.title ? item.title.replace(/Royal Grand IN Resorts?/g, 'Royalgrandin Resort').replace(/Royal Grand IN/g, 'Royalgrandin Resort') : item.title;
      return { ...item, title };
    });
    await mongoose.connection.db.collection('settings').updateOne(
      { key: 'seo_config' },
      { $set: { value: updatedSeo } }
    );
    console.log('seo_config updated');
  }

  // 3. Update reviews in DB to ensure none mention old name
  const reviews = await mongoose.connection.db.collection('reviews').find({}).toArray();
  for (const r of reviews) {
    if (r.body && (r.body.includes('Royal Grand IN') || r.body.includes('Royal Gradin') || r.body.includes('Vanapriya'))) {
      const newBody = r.body
        .replace(/Royal Grand IN Resorts/g, 'Royalgrandin Resort')
        .replace(/Royal Grand IN/g, 'Royalgrandin Resort')
        .replace(/Royal Gradin/g, 'Royalgrandin Resort')
        .replace(/Vanapriya Resort/g, 'Royalgrandin Resort')
        .replace(/Vanapriya/g, 'Royalgrandin Resort');
      await mongoose.connection.db.collection('reviews').updateOne(
        { _id: r._id },
        { $set: { body: newBody } }
      );
      console.log('Updated review:', r.id);
    }
  }

  // 4. Update faqs in DB to ensure question has Royalgrandin Resort
  const faqs = await mongoose.connection.db.collection('faqs').find({}).toArray();
  for (const f of faqs) {
    if (f.question && (f.question.includes('Royal Grand') || f.question.includes('Royal Gradin') || f.question.includes('Vanapriya'))) {
      const newQ = f.question
        .replace(/Royal Grand IN Resorts/g, 'Royalgrandin Resort')
        .replace(/Royal Grand IN/g, 'Royalgrandin Resort')
        .replace(/Royal Gradin/g, 'Royalgrandin Resort')
        .replace(/Vanapriya Resort/g, 'Royalgrandin Resort')
        .replace(/Vanapriya/g, 'Royalgrandin Resort');
      await mongoose.connection.db.collection('faqs').updateOne(
        { _id: f._id },
        { $set: { question: newQ } }
      );
      console.log('Updated faq:', f.id);
    }
  }

  await mongoose.disconnect();
  console.log('Finished updating MongoDB Atlas successfully!');
}

updateDb().catch(console.error);
