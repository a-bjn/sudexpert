package com.backend.sudexpert.config;

import com.backend.sudexpert.domain.Category;
import com.backend.sudexpert.domain.Product;
import com.backend.sudexpert.repository.CategoryRepository;
import com.backend.sudexpert.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {
            log.info("Initializing database with sample data...");
            initializeData();
            log.info("Database initialization completed!");
        } else {
            log.info("Database already contains data. Skipping initialization.");
        }
    }

    private void initializeData() {
        Category electrozi = Category.builder()
                .name("Electrozi")
                .build();
        Category sarma = Category.builder()
                .name("Sârmă de sudare")
                .build();
        Category consumabile = Category.builder()
                .name("Consumabile")
                .build();
        Category echipamente = Category.builder()
                .name("Echipamente")
                .build();

        List<Category> categories = categoryRepository.saveAll(List.of(
                electrozi, sarma, consumabile, echipamente
        ));

        List<Product> products = List.of(
                Product.builder()
                        .name("Electrod rutilic E6013 - 3.25mm")
                        .description("Electrod rutilic pentru sudare generală, diametru 3.25mm. Ideal pentru începători și sudare în toate pozițiile.")
                        .price(new BigDecimal("12.50"))
                        .stock(150)
                        .imageUrl("https://via.placeholder.com/300x300?text=Electrod+3.25mm")
                        .category(electrozi)
                        .build(),
                Product.builder()
                        .name("Electrod bazic E7018 - 4mm")
                        .description("Electrod bazic pentru sudare de înaltă calitate, diametru 4mm. Rezistență ridicată la impact.")
                        .price(new BigDecimal("18.75"))
                        .stock(100)
                        .imageUrl("https://via.placeholder.com/300x300?text=Electrod+4mm")
                        .category(electrozi)
                        .build(),
                Product.builder()
                        .name("Electrod inox E308L - 2.5mm")
                        .description("Electrod pentru oțel inoxidabil, diametru 2.5mm. Rezistență la coroziune.")
                        .price(new BigDecimal("25.00"))
                        .stock(80)
                        .imageUrl("https://via.placeholder.com/300x300?text=Electrod+Inox")
                        .category(electrozi)
                        .build(),
                Product.builder()
                        .name("Sârmă MIG/MAG 0.8mm - 5kg")
                        .description("Sârmă de sudare MIG/MAG, diametru 0.8mm, bobină de 5kg. Pentru oțel carbon.")
                        .price(new BigDecimal("45.00"))
                        .stock(50)
                        .imageUrl("https://via.placeholder.com/300x300?text=Sarma+MIG+0.8")
                        .category(sarma)
                        .build(),
                Product.builder()
                        .name("Sârmă MIG/MAG 1.0mm - 15kg")
                        .description("Sârmă de sudare MIG/MAG, diametru 1.0mm, bobină de 15kg. Pentru lucrări mai mari.")
                        .price(new BigDecimal("120.00"))
                        .stock(30)
                        .imageUrl("https://via.placeholder.com/300x300?text=Sarma+MIG+1.0")
                        .category(sarma)
                        .build(),
                Product.builder()
                        .name("Sârmă TIG inox 1.6mm - 1kg")
                        .description("Sârmă de sudare TIG pentru oțel inoxidabil, diametru 1.6mm.")
                        .price(new BigDecimal("35.50"))
                        .stock(60)
                        .imageUrl("https://via.placeholder.com/300x300?text=Sarma+TIG+Inox")
                        .category(sarma)
                        .build(),
                Product.builder()
                        .name("Gaz protector CO2 - 10L")
                        .description("Gaz protector CO2 pentru sudare MIG/MAG, butelie de 10 litri.")
                        .price(new BigDecimal("85.00"))
                        .stock(25)
                        .imageUrl("https://via.placeholder.com/300x300?text=Gaz+CO2")
                        .category(consumabile)
                        .build(),
                Product.builder()
                        .name("Gaz Argon - 10L")
                        .description("Gaz argon pur pentru sudare TIG, butelie de 10 litri.")
                        .price(new BigDecimal("95.00"))
                        .stock(20)
                        .imageUrl("https://via.placeholder.com/300x300?text=Gaz+Argon")
                        .category(consumabile)
                        .build(),
                Product.builder()
                        .name("Mască de sudare auto-darkening")
                        .description("Mască de protecție cu lentilă auto-darkening, nivel de protecție 9-13 DIN.")
                        .price(new BigDecimal("125.00"))
                        .stock(40)
                        .imageUrl("https://via.placeholder.com/300x300?text=Masca+Sudare")
                        .category(consumabile)
                        .build(),
                Product.builder()
                        .name("Mănuși de protecție pentru sudare")
                        .description("Mănuși rezistente la căldură și scântei, mărime universală.")
                        .price(new BigDecimal("15.00"))
                        .stock(100)
                        .imageUrl("https://via.placeholder.com/300x300?text=Manusi+Sudare")
                        .category(consumabile)
                        .build(),
                Product.builder()
                        .name("Aparat de sudare MIG 200A")
                        .description("Aparat de sudare MIG/MAG, 200A, pentru uz casnic și profesional.")
                        .price(new BigDecimal("1250.00"))
                        .stock(10)
                        .imageUrl("https://via.placeholder.com/300x300?text=Aparat+MIG+200A")
                        .category(echipamente)
                        .build(),
                Product.builder()
                        .name("Aparat de sudare TIG 200A")
                        .description("Aparat de sudare TIG, 200A, cu control precis al amperajului.")
                        .price(new BigDecimal("1850.00"))
                        .stock(8)
                        .imageUrl("https://via.placeholder.com/300x300?text=Aparat+TIG+200A")
                        .category(echipamente)
                        .build(),
                Product.builder()
                        .name("Torță TIG cu răcire cu apă")
                        .description("Torță TIG profesională cu sistem de răcire cu apă, pentru lucrări intensive.")
                        .price(new BigDecimal("450.00"))
                        .stock(15)
                        .imageUrl("https://via.placeholder.com/300x300?text=Torca+TIG")
                        .category(echipamente)
                        .build(),
                Product.builder()
                        .name("Electrod celulozic E6010 - 3mm")
                        .description("Electrod celulozic pentru sudare verticală descendentă, diametru 3mm.")
                        .price(new BigDecimal("16.00"))
                        .stock(120)
                        .imageUrl("https://via.placeholder.com/300x300?text=Electrod+Celulozic")
                        .category(electrozi)
                        .build(),
                Product.builder()
                        .name("Electrod rutilo-celulozic E7024 - 3.25mm")
                        .description("Electrod pentru sudare în poziție plană și orizontală.")
                        .price(new BigDecimal("14.50"))
                        .stock(90)
                        .imageUrl("https://via.placeholder.com/300x300?text=Electrod+7024")
                        .category(electrozi)
                        .build(),
                Product.builder()
                        .name("Sârmă MIG aluminiu 1.2mm - 2kg")
                        .description("Sârmă de sudare MIG pentru aluminiu, diametru 1.2mm.")
                        .price(new BigDecimal("95.00"))
                        .stock(35)
                        .imageUrl("https://via.placeholder.com/300x300?text=Sarma+Aluminiu")
                        .category(sarma)
                        .build(),
                Product.builder()
                        .name("Sârmă flux 0.9mm - 5kg")
                        .description("Sârmă cu flux pentru sudare fără gaz protector.")
                        .price(new BigDecimal("55.00"))
                        .stock(45)
                        .imageUrl("https://via.placeholder.com/300x300?text=Sarma+Flux")
                        .category(sarma)
                        .build(),
                Product.builder()
                        .name("Șort de protecție din piele")
                        .description("Șort de protecție din piele pentru sudori, rezistent la scântei.")
                        .price(new BigDecimal("85.00"))
                        .stock(30)
                        .imageUrl("https://via.placeholder.com/300x300?text=Sort+Piele")
                        .category(consumabile)
                        .build(),
                Product.builder()
                        .name("Electrozi de tungsten WT20 - 2.4mm")
                        .description("Electrozi de tungsten pentru sudare TIG, diametru 2.4mm, pachet 10 buc.")
                        .price(new BigDecimal("45.00"))
                        .stock(55)
                        .imageUrl("https://via.placeholder.com/300x300?text=Electrozi+Tungsten")
                        .category(consumabile)
                        .build(),
                Product.builder()
                        .name("Perie de sârmă pentru curățare")
                        .description("Perie de sârmă pentru curățarea sudurilor și îndepărtarea zgurii.")
                        .price(new BigDecimal("12.00"))
                        .stock(150)
                        .imageUrl("https://via.placeholder.com/300x300?text=Perie+Sarma")
                        .category(consumabile)
                        .build(),
                Product.builder()
                        .name("Aparat de sudare invertor 160A")
                        .description("Aparat de sudare invertor compact, 160A, pentru uz casnic.")
                        .price(new BigDecimal("850.00"))
                        .stock(12)
                        .imageUrl("https://via.placeholder.com/300x300?text=Invertor+160A")
                        .category(echipamente)
                        .build(),
                Product.builder()
                        .name("Reductor presiune CO2/Argon")
                        .description("Reductor de presiune cu dublu manometru pentru butelii de gaz.")
                        .price(new BigDecimal("120.00"))
                        .stock(25)
                        .imageUrl("https://via.placeholder.com/300x300?text=Reductor")
                        .category(echipamente)
                        .build(),
                Product.builder()
                        .name("Cablu de masă 3m - 35mm²")
                        .description("Cablu de masă pentru sudare, 3 metri, secțiune 35mm².")
                        .price(new BigDecimal("35.00"))
                        .stock(40)
                        .imageUrl("https://via.placeholder.com/300x300?text=Cablu+Masa")
                        .category(echipamente)
                        .build(),
                Product.builder()
                        .name("Cablu portelectrod 3m - 35mm²")
                        .description("Cablu portelectrod pentru sudare, 3 metri, secțiune 35mm².")
                        .price(new BigDecimal("38.00"))
                        .stock(40)
                        .imageUrl("https://via.placeholder.com/300x300?text=Cablu+Portelectrod")
                        .category(echipamente)
                        .build()
        );

        productRepository.saveAll(products);
    }
}

