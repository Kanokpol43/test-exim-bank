Feature: จัดส่งสินค้า
    As a ผู้ใช้
    I want to กรอกข้อมูลจัดส่ง
    So that ฉันสามารถยืนยันคำสั่งซื้อได้

    Background:
        Given ผู้ใช้นำทางไปยังหน้า Login
        When ผู้ใช้กรอกอีเมล "default"
        When ผู้ใช้กรอกรหัสผ่าน "default"
        When ผู้ใช้คลิกปุ่มเข้าสู่ระบบ
        Then ผู้ใช้ควรเห็นหน้าร้านค้า
        When ผู้ใช้เลือกสินค้า "Dior J'adore" จำนวน 1 ชิ้น
        When ผู้ใช้คลิกปุ่ม "PROCEED TO CHECKOUT"
        Then ผู้ใช้ควรเห็นหน้ารายละเอียดจัดส่งสินค้า

    Scenario: Case 1 - กรอกข้อมูลจัดส่งครบถ้วน (Phone, Street, City, Country)
        When ผู้ใช้กรอกเบอร์โทรศัพท์
        When ผู้ใช้กรอกที่อยู่
        When ผู้ใช้กรอกชื่อเมือง
        When ผู้ใช้เลือกประเทศ
        When ผู้ใช้คลิกปุ่ม Submit Order

    Scenario: Case 2 - ไม่กรอกเบอร์โทรศัพท์
        When ผู้ใช้กรอกที่อยู่
        When ผู้ใช้กรอกชื่อเมือง
        When ผู้ใช้เลือกประเทศ
        When ผู้ใช้คลิกปุ่ม Submit Order
        Then ผู้ใช้ควรเจอ Required Message สำหรับ "#phone"

    Scenario: Case 3 - ไม่กรอกที่อยู่
        When ผู้ใช้กรอกเบอร์โทรศัพท์
        When ผู้ใช้กรอกชื่อเมือง
        When ผู้ใช้เลือกประเทศ
        When ผู้ใช้คลิกปุ่ม Submit Order
        Then ผู้ใช้ควรเจอ Required Message สำหรับ "[name='street']"

    Scenario: Case 4 - ไม่กรอกชื่อเมือง
        When ผู้ใช้กรอกเบอร์โทรศัพท์
        When ผู้ใช้กรอกที่อยู่
        When ผู้ใช้เลือกประเทศ
        When ผู้ใช้คลิกปุ่ม Submit Order
        Then ผู้ใช้ควรเจอ Required Message สำหรับ "[name='city']"

    Scenario: Case 5 - ไม่กรอกข้อมูลใดเลย
        When ผู้ใช้คลิกปุ่ม Submit Order
        Then ผู้ใช้ควรเจอ Required Message สำหรับ "#phone"
