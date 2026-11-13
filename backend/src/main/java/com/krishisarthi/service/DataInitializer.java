package com.krishisarthi.service;

import com.krishisarthi.config.ApplicationProperties;
import com.krishisarthi.entity.*;
import com.krishisarthi.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final FarmerProfileRepository farmerProfileRepository;
    private final BuyerProfileRepository buyerProfileRepository;
    private final TransporterProfileRepository transporterProfileRepository;
    private final FarmRepository farmRepository;
    private final CropListingRepository cropListingRepository;
    private final CropImageRepository cropImageRepository;
    private final CropBatchRepository cropBatchRepository;
    private final TraceabilityEventRepository traceabilityEventRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationProperties properties;

    public DataInitializer(UserRepository userRepository,
                           FarmerProfileRepository farmerProfileRepository,
                           BuyerProfileRepository buyerProfileRepository,
                           TransporterProfileRepository transporterProfileRepository,
                           FarmRepository farmRepository,
                           CropListingRepository cropListingRepository,
                           CropImageRepository cropImageRepository,
                           CropBatchRepository cropBatchRepository,
                           TraceabilityEventRepository traceabilityEventRepository,
                           PasswordEncoder passwordEncoder,
                           ApplicationProperties properties) {
        this.userRepository = userRepository;
        this.farmerProfileRepository = farmerProfileRepository;
        this.buyerProfileRepository = buyerProfileRepository;
        this.transporterProfileRepository = transporterProfileRepository;
        this.farmRepository = farmRepository;
        this.cropListingRepository = cropListingRepository;
        this.cropImageRepository = cropImageRepository;
        this.cropBatchRepository = cropBatchRepository;
        this.traceabilityEventRepository = traceabilityEventRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.findByEmail(properties.getSecurity().getAdminEmail()).isPresent()) {
            logger.info("[KrishiSarthi DataInitializer] Database already initialized. Skipping seed.");
            return;
        }

        logger.info("[KrishiSarthi DataInitializer] Seeding initial test accounts and marketplace data...");

        // 1. Admin Owner
        User admin = new User(
                properties.getSecurity().getAdminName(),
                properties.getSecurity().getAdminEmail(),
                "9999999999",
                passwordEncoder.encode(properties.getSecurity().getAdminPassword()),
                UserRole.ADMIN
        );
        admin.setPreferredLanguage("en");
        admin.setIsActive(true);
        admin.setIsVerified(true);
        userRepository.save(admin);

        // 2. Farmer 1: Ramesh Kumar (Haryana)
        User farmer1 = new User(
                "Ramesh Kumar",
                "ramesh@farmlink.in",
                "9876543210",
                passwordEncoder.encode("farmer123"),
                UserRole.FARMER
        );
        farmer1.setPreferredLanguage("hi");
        farmer1.setIsActive(true);
        farmer1.setIsVerified(true);
        farmer1 = userRepository.save(farmer1);

        FarmerProfile fp1 = new FarmerProfile(
                farmer1, "Karnal", "Karnal", "Haryana", "132001",
                "Wheat, Mustard, Basmati Rice", 15
        );
        fp1.setRating(4.9);
        fp1.setTotalSalesCount(12);
        fp1 = farmerProfileRepository.save(fp1);

        Farm farm1 = new Farm();
        farm1.setFarmer(fp1);
        farm1.setFarmName("Ramesh Green Fields");
        farm1.setSizeAcres(5.5);
        farm1.setSoilType("Alluvial");
        farm1.setIrrigationSource("Canal & Tube Well");
        farm1.setVillage("Karnal");
        farm1.setDistrict("Karnal");
        farm1.setState("Haryana");
        farmRepository.save(farm1);

        // 3. Farmer 2: Sunita Devi (Punjab)
        User farmer2 = new User(
                "Sunita Devi",
                "sunita@farmlink.in",
                "9876543211",
                passwordEncoder.encode("farmer123"),
                UserRole.FARMER
        );
        farmer2.setPreferredLanguage("hi");
        farmer2.setIsActive(true);
        farmer2.setIsVerified(true);
        farmer2 = userRepository.save(farmer2);

        FarmerProfile fp2 = new FarmerProfile(
                farmer2, "Patiala", "Patiala", "Punjab", "147001",
                "Potato, Rice, Wheat", 8
        );
        fp2.setRating(4.8);
        fp2.setTotalSalesCount(7);
        farmerProfileRepository.save(fp2);

        // 4. Buyer: Rajiv Malhotra (ABC Foods)
        User buyer = new User(
                "Rajiv Malhotra",
                "rajiv@abcfoods.com",
                "9811122233",
                passwordEncoder.encode("buyer123"),
                UserRole.BUYER
        );
        buyer.setPreferredLanguage("hi");
        buyer.setIsActive(true);
        buyer.setIsVerified(true);
        buyer = userRepository.save(buyer);

        BuyerProfile bp = new BuyerProfile(
                buyer, "ABC Agro Foods Pvt Ltd", "Wholesaler / Processor",
                "07AAAAA0000A1Z5", "New Delhi", "Delhi"
        );
        bp.setRating(4.9);
        bp.setTotalPurchasesCount(25);
        buyerProfileRepository.save(bp);

        // 5. Transporter: Gurdeep Singh (Kishan Logistics)
        User transporter = new User(
                "Gurdeep Singh",
                "gurdeep@kishanlogistics.in",
                "9822233344",
                passwordEncoder.encode("trans123"),
                UserRole.TRANSPORTER
        );
        transporter.setPreferredLanguage("hi");
        transporter.setIsActive(true);
        transporter.setIsVerified(true);
        transporter = userRepository.save(transporter);

        TransporterProfile tp = new TransporterProfile(
                transporter, "Kishan Logistics & Freight", "10-Wheeler Truck",
                "HR-05-AB-1234", 15.0, "Haryana, Punjab, Delhi NCR, Rajasthan"
        );
        tp.setRating(4.95);
        tp.setTotalDeliveriesCount(48);
        transporterProfileRepository.save(tp);

        // 6. Crop Listings & Traceability Batches
        CropListing listing1 = new CropListing();
        listing1.setFarmer(farmer1);
        listing1.setFarm(farm1);
        listing1.setCropName("Gehun (Wheat)");
        listing1.setVariety("Sharbati Premium");
        listing1.setQuantity(2500.0);
        listing1.setUnit("kg");
        listing1.setExpectedPricePerUnit(26.5);
        listing1.setQualityGrade("Grade A");
        listing1.setLocationDistrict("Karnal");
        listing1.setLocationState("Haryana");
        listing1.setDescription("100% Organic certified Golden Sharbati Wheat harvested from canal irrigated fertile soil.");
        listing1.setStatus(CropListingStatus.PUBLISHED);
        listing1.setViewsCount(45);
        listing1 = cropListingRepository.save(listing1);

        CropImage img1 = new CropImage(listing1, "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80", true);
        cropImageRepository.save(img1);

        String batchCode1 = "FL-WHT-HR-2026-000123";
        CropBatch batch1 = new CropBatch(
                batchCode1,
                listing1,
                farmer1,
                "Karnal, Haryana",
                "/trace.html?batch=" + batchCode1
        );
        batch1 = cropBatchRepository.save(batch1);

        TraceabilityEvent te1 = new TraceabilityEvent(
                batch1,
                "Farm Harvest & Quality Inspection",
                "Karnal, Haryana",
                "Harvest completed with 11.2% moisture content. Certified Grade A organic.",
                "Ramesh Kumar (Farmer)"
        );
        TraceabilityEvent te2 = new TraceabilityEvent(
                batch1,
                "Collection & Moisture Quality Lab",
                "KrishiSarthi Agritech Center, Karnal",
                "Lab testing passed. Free from pesticide residues.",
                "Dr. Satish Sharma (Quality Officer)"
        );
        traceabilityEventRepository.save(te1);
        traceabilityEventRepository.save(te2);

        // Crop Listing 2: Basmati Rice
        CropListing listing2 = new CropListing();
        listing2.setFarmer(farmer1);
        listing2.setFarm(farm1);
        listing2.setCropName("Basmati Rice");
        listing2.setVariety("Pusa 1121 Extra Long");
        listing2.setQuantity(1200.0);
        listing2.setUnit("kg");
        listing2.setExpectedPricePerUnit(85.0);
        listing2.setQualityGrade("Grade A");
        listing2.setLocationDistrict("Karnal");
        listing2.setLocationState("Haryana");
        listing2.setDescription("Aromatic traditional 1121 Pusa Basmati Rice. Aged grain with excellent cooking elongation.");
        listing2.setStatus(CropListingStatus.PUBLISHED);
        listing2.setViewsCount(32);
        listing2 = cropListingRepository.save(listing2);

        CropImage img2 = new CropImage(listing2, "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80", true);
        cropImageRepository.save(img2);

        String batchCode2 = "FL-RIC-HR-2026-000124";
        CropBatch batch2 = new CropBatch(
                batchCode2,
                listing2,
                farmer1,
                "Karnal, Haryana",
                "/trace.html?batch=" + batchCode2
        );
        batch2 = cropBatchRepository.save(batch2);

        TraceabilityEvent te2_1 = new TraceabilityEvent(
                batch2,
                "Paddy Harvest & Sun Drying",
                "Taraori, Karnal",
                "Harvested and sun-dried to optimal moisture standards.",
                "Ramesh Kumar (Farmer)"
        );
        traceabilityEventRepository.save(te2_1);

        // Crop Listing 3: Potato
        CropListing listing3 = new CropListing();
        listing3.setFarmer(farmer2);
        listing3.setCropName("Aloo (Potato)");
        listing3.setVariety("Kufri Jyoti Fresh");
        listing3.setQuantity(4000.0);
        listing3.setUnit("kg");
        listing3.setExpectedPricePerUnit(14.0);
        listing3.setQualityGrade("Grade A");
        listing3.setLocationDistrict("Patiala");
        listing3.setLocationState("Punjab");
        listing3.setDescription("Fresh table-quality potatoes. Direct farm dug with uniform medium-large size.");
        listing3.setStatus(CropListingStatus.PUBLISHED);
        listing3.setViewsCount(18);
        listing3 = cropListingRepository.save(listing3);

        CropImage img3 = new CropImage(listing3, "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80", true);
        cropImageRepository.save(img3);

        String batchCode3 = "FL-POT-PB-2026-000125";
        CropBatch batch3 = new CropBatch(
                batchCode3,
                listing3,
                farmer2,
                "Patiala, Punjab",
                "/trace.html?batch=" + batchCode3
        );
        batch3 = cropBatchRepository.save(batch3);

        TraceabilityEvent te3_1 = new TraceabilityEvent(
                batch3,
                "Farm Harvest & Grading",
                "Patiala, Punjab",
                "Sorted and packed in 50kg gunny bags.",
                "Sunita Devi (Farmer)"
        );
        traceabilityEventRepository.save(te3_1);

        logger.info("[KrishiSarthi DataInitializer] Successfully seeded 5 users, 3 crop listings, and traceability registries.");
    }
}
