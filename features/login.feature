Feature: เข้าสู่ระบบ
  As a ผู้ใช้
  I want to เข้าสู่ระบบแอปพลิเคชันโอการค้า
  So that ฉันสามารถเข้าใช้งานร้านค้า

  Background:
    Given ผู้ใช้นำทางไปยังหน้า Login

  Scenario: Case 1 - กรอกข้อมูลถูกทั้งหมด (จาก example.json)
    When ผู้ใช้กรอกอีเมล "default"
    And ผู้ใช้กรอกรหัสผ่าน "default"
    And ผู้ใช้คลิกปุ่มเข้าสู่ระบบ
    Then ผู้ใช้ควรเห็นหน้าร้านค้า

  Scenario Outline: เข้าสู่ระบบล้มเหลวด้วยข้อมูลต่างๆ
    When <action_email>
    And <action_password>
    And ผู้ใช้คลิกปุ่มเข้าสู่ระบบ
    Then ผู้ใช้ควรเห็นข้อความแสดงข้อผิดพลาด

    Examples: Case 2 - กรอกถูกต้องเฉพาะอีเมล
      | action_email | action_password |
      | ผู้ใช้กรอกอีเมล "default" | ผู้ใช้กรอกรหัสผ่าน "wrongpassword" |

    Examples: Case 3 - กรอกถูกต้องเฉพาะรหัสผ่าน
      | action_email | action_password |
      | ผู้ใช้กรอกอีเมล "wrongemail@example.com" | ผู้ใช้กรอกรหัสผ่าน "default" |

    Examples: Case 4 - กรอกข้อมูลผิดทั้งหมด
      | action_email | action_password |
      | ผู้ใช้กรอกอีเมล "wrongemail@example.com" | ผู้ใช้กรอกรหัสผ่าน "wrongpassword" |

  Scenario: Case 5 - กรอกเฉพาะข้อมูลอีเมล
    When ผู้ใช้กรอกอีเมล "default"
    And ผู้ใช้คลิกปุ่มเข้าสู่ระบบ
    Then ผู้ใช้ควรเห็นข้อความแสดงข้อผิดพลาด

  Scenario: Case 6 - กรอกเฉพาะข้อมูลรหัสผ่าน
    When ผู้ใช้กรอกรหัสผ่าน "default"
    And ผู้ใช้คลิกปุ่มเข้าสู่ระบบ
    Then ผู้ใช้ควรเห็นข้อความแสดงข้อผิดพลาด
