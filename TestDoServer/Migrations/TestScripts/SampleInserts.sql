INSERT INTO `testdo`.`todoproject` (`Name`, `Owner`, `Id`) VALUES ('TestProj', 'Jonathan', '1');
INSERT INTO `testdo`.`todolist` (`Id`, `Name`, `Owner`, `ProjectId`) VALUES ('1', 'List1', 'Jonathan', '1');
INSERT INTO `testdo`.`todolist` (`Id`, `Name`, `Owner`, `ProjectId`) VALUES ('2', 'List2', 'Jonathan', '1');
INSERT INTO `testdo`.`todoitem` (`Id`, `Name`, `Complete`, `ToDoListId`) VALUES ('1', 'Item1', b'1', '1');
INSERT INTO `testdo`.`todoitem` (`Id`, `Name`, `Complete`, `ToDoListId`) VALUES ('2', 'Item2', b'0', '1');

