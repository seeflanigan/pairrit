# This adds a command to the /pair list
#
# Example usage:
# Command.add('my_command', MyClass::Handler)
#
# where `MyClass::Handler` is a class fitting the following format:
#
# class MyClass::Handler
#   def initialize(params)
#   end
#
#   def process
#   end
# end

Command.add('join', Command::Join)
Command.add('leave', Command::Leave)
Command.add('list', Command::List)
