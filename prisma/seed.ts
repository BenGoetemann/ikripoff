import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { createHash } from "crypto";
import { createClient } from '@supabase/supabase-js'

const useHash = (value: any) => {
  let hash = createHash("sha256");
  let code = value;
  code = hash.update(code);
  code = hash.digest(code);
  return code.toString("hex");
};

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);

async function main() {

  // TODO: Check Policies if this solution is secure
  const { data, error } = await supabase.storage.createBucket("contactThumbnails", {
    public: false,
  });

  console.log(data, error);

  const address = await prisma.address.upsert({
    where: { id: "1f9a3347-0047-42e0-bbcf-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-0047-42e0-bbcf-44e14e759173",
      street: "Alice Str.",
      streetNumber: "12",
      postalCode: "12345",
      city: "Berlin",
      hash: useHash("Alice Str.1212345Berlin"),
    },
  });
  const contact = await prisma.contact.upsert({
    where: { id: "1f9a3347-1111-42e0-bbcf-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-1111-42e0-bbcf-44e14e759173",
      firstName: "Brian",
      lastName: "Locks",
      email: "brianlocks@gmaa.co",
      addressId: address.id,
      thumbnail:
        "https://static01.nyt.com/images/2021/10/13/science/13shatner-launch-oldest-person-sub/13shatner-launch-oldest-person-sub-superJumbo.jpg",
    },
  });
  const contact2 = await prisma.contact.upsert({
    where: { id: "1f9a3347-2222-42e0-bbcf-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-2222-42e0-bbcf-44e14e759173",
      firstName: "Justin",
      lastName: "Tank",
      email: "justintank@gmaa.co",
      addressId: address.id,
      thumbnail:
        "https://www.tagesspiegel.de/images/spreewaldkrimi-die-siebte-person/alternates/BASE_1_1_W1000/spreewaldkrimi---die-siebte-person.jpeg",
    },
  });
  const contact3 = await prisma.contact.upsert({
    where: { id: "1f9a3347-3333-42e0-bbcf-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-3333-42e0-bbcf-44e14e759173",
      firstName: "Rudy",
      lastName: "Edison",
      email: "rudyedison@gmaa.co",
      addressId: address.id,
      thumbnail:
        "https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg",
    },
  });
  const contact4 = await prisma.contact.upsert({
    where: { id: "1f9a3347-4444-42e0-bbcf-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-4444-42e0-bbcf-44e14e759173",
      firstName: "Simon",
      lastName: "Rumler",
      email: "simonramler@gmaa.co",
      addressId: address.id,
      thumbnail:
        "https://www.telegraph.co.uk/content/dam/royal-family/2022/11/28/TELEMMGLPICT000317879575_trans_NvBQzQNjv4BqA7N2CxnJWnYI3tCbVBgu9T0aesusvN1TE7a0ddd_esI.jpeg",
    },
  });

  const phase1 = await prisma.phase.upsert({
    where: { id: "1f9a3347-0047-42e0-1221-55e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-0047-42e0-1221-55e14e759173",
      name: "In Vorbereitung",
      requestRelevant: false,
      propertyRelevant: true,
    },
  });

  const phase2 = await prisma.phase.upsert({
    where: { id: "1f9a3347-1313-42e0-1221-55e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-1313-42e0-1221-55e14e759173",
      name: "In Vermarktung",
      requestRelevant: false,
      propertyRelevant: true,
    },
  });

  const phase3 = await prisma.phase.upsert({
    where: { id: "1f9a3347-0047-42e0-bbcf-55e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-0047-42e0-bbcf-55e14e759173",
      name: "Neue Anfragen",
      requestRelevant: true,
      propertyRelevant: false,
    },
  });
  const phase4 = await prisma.phase.upsert({
    where: { id: "1f9a6347-0447-42e0-bbcf-55e14e759173" },
    update: {},
    create: {
      id: "1f9a6347-0447-42e0-bbcf-55e14e759173",
      name: "Interessenten-Kontakt",
      requestRelevant: true,
      propertyRelevant: true,
    },
  });
  const phase5 = await prisma.phase.upsert({
    where: { id: "1f9a6857-0047-42e0-bbcf-55e14e759173" },
    update: {},
    create: {
      id: "1f9a6857-0047-42e0-bbcf-55e14e759173",
      name: "In Besichtigung",
      requestRelevant: true,
      propertyRelevant: true,
    },
  });
  const phase6 = await prisma.phase.upsert({
    where: { id: "1f9a6857-1234-42e0-bbcf-55e14e759173" },
    update: {},
    create: {
      id: "1f9a6857-1234-42e0-bbcf-55e14e759173",
      name: "In Kaufpreisverhandlung",
      requestRelevant: true,
      propertyRelevant: true,
    },
  });
  const property = await prisma.property.upsert({
    where: { id: "1f9a3347-0047-42e0-cccf-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3347-0047-42e0-cccf-44e14e759173",
      title: "Wunderschöne Villa in Berlin",
      apartmentType: "Einfamilienhaus",
      listingType: "houseBuy",
      purchasePrice: 123,
      phaseId: phase4.id,
      addressId: address.id,
      contactId: contact.id,
      thumbnail:
        "https://images.adsttc.com/media/images/63c0/a935/7643/4a39/8498/948f/large_jpg/casa-tunich-apiron_13.jpg?1673570670",
    },
  });
  const request = await prisma.request.upsert({
    where: { id: "1f9a3344-0047-42e0-1111-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3344-0047-42e0-1111-44e14e759173",
      targetId: "1f9a3347-1147-42e0-cccf-44e14e759173",
      phaseId: phase3.id,
      propertyId: property.id,
      contactId: contact.id,
      unreadMessage: true,
    },
  });
  const request2 = await prisma.request.upsert({
    where: { id: "1f9a3344-0047-42e0-2222-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3344-0047-42e0-2222-44e14e759173",
      targetId: "1f9a3347-1147-42e0-cccf-44e14e759173",
      phaseId: phase3.id,
      propertyId: property.id,
      contactId: contact2.id,
      unreadMessage: true,
    },
  });
  const request3 = await prisma.request.upsert({
    where: { id: "1f9a3344-0047-42e0-3333-44e14e759173" },
    update: {},
    create: {
      id: "1f9a3344-0047-42e0-3333-44e14e759173",
      targetId: "1f9a3347-1147-42e0-cccf-44e14e759173",
      phaseId: phase4.id,
      propertyId: property.id,
      contactId: contact3.id,
      unreadMessage: false,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
