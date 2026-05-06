Feature: เลือกสินค้า
  As a ผู้ใช้
  I want to เลือกสินค้าจากร้านค้า
  So that ฉันสามารถเลือกสินค้าและพาไปหน้าชำระเงินได้

  Background:
    Given ผู้ใช้นำทางไปยังหน้า Login
    When ผู้ใช้กรอกอีเมล "default"
    When ผู้ใช้กรอกรหัสผ่าน "default"
    When ผู้ใช้คลิกปุ่มเข้าสู่ระบบ
    Then ผู้ใช้ควรเห็นหน้าร้านค้า

  Scenario: Case 1 - เลือกสินค้าถูกต้อง (Dior 2 units + Gucci 3 units)
    When ผู้ใช้เลือกสินค้า "Dior J'adore" จำนวน 2 ชิ้น
    And ผู้ใช้เลือกสินค้า "Gucci Bloom Eau de" จำนวน 3 ชิ้น
    Then ยอดรวมควรมีราคา 419.95
    When ผู้ใช้คลิกปุ่ม "PROCEED TO CHECKOUT"
    Then ผู้ใช้ควรเห็นหน้ารายละเอียดจัดส่งสินค้า

  Scenario: Case 2 - เลือกสินค้าถูกต้อง (Dior 2 units)
    When ผู้ใช้เลือกสินค้า "Dior J'adore" จำนวน 2 ชิ้น
    Then ยอดรวมควรมีราคา 179.98
    When ผู้ใช้คลิกปุ่ม "PROCEED TO CHECKOUT"
    Then ผู้ใช้ควรเห็นหน้ารายละเอียดจัดส่งสินค้า


  Scenario: Case 3 - เลือกสินค้าถูกต้อง (Gucci 3 units)
    When  ผู้ใช้เลือกสินค้า "Gucci Bloom Eau de" จำนวน 3 ชิ้น
    Then ยอดรวมควรมีราคา 239.97
    When ผู้ใช้คลิกปุ่ม "PROCEED TO CHECKOUT"
    Then ผู้ใช้ควรเห็นหน้ารายละเอียดจัดส่งสินค้า


  Scenario: Case 4 - เลือกสินค้าถูกต้อง (Red Lipstick 1 units)
    When  ผู้ใช้เลือกสินค้า "Red Lipstick" จำนวน 1 ชิ้น
    Then ยอดรวมควรมีราคา 12.99
    When ผู้ใช้คลิกปุ่ม "PROCEED TO CHECKOUT"
    Then ผู้ใช้ควรเห็นหน้ารายละเอียดจัดส่งสินค้า
